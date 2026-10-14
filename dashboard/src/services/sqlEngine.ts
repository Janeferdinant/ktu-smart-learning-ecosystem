/**
 * In-Memory SQL Execution Engine for KTU CS DBMS Curriculum (CST205 / CST304)
 * Parses and executes SELECT, WHERE, ORDER BY, LIMIT on relational datasets.
 */

export interface StudentRecord {
  id: number;
  name: string;
  course: string;
  semester: string;
  gpa: number;
  credits: number;
  attendance: number;
}

export const INITIAL_STUDENTS: StudentRecord[] = [
  { id: 101, name: 'Student 101', course: 'CST303 Networks', semester: 'S5', gpa: 8.9, credits: 21, attendance: 92 },
  { id: 102, name: 'Student 102', course: 'CST205 Java OOP', semester: 'S3', gpa: 9.4, credits: 19, attendance: 96 },
  { id: 103, name: 'Student 103', course: 'CST303 Networks', semester: 'S5', gpa: 7.8, credits: 21, attendance: 84 },
  { id: 104, name: 'Student 104', course: 'PCADT502 Robotics', semester: 'S5', gpa: 9.1, credits: 22, attendance: 94 },
  { id: 105, name: 'Student 105', course: 'CST205 Java OOP', semester: 'S3', gpa: 8.5, credits: 19, attendance: 88 },
  { id: 106, name: 'Student 106', course: 'CST305 Artificial Intelligence', semester: 'S5', gpa: 9.6, credits: 21, attendance: 98 },
  { id: 107, name: 'Student 107', course: 'CST307 Data Mining', semester: 'S5', gpa: 8.2, credits: 20, attendance: 85 },
  { id: 108, name: 'Student 108', course: 'PECST521 Software Project Management', semester: 'S5', gpa: 9.0, credits: 21, attendance: 91 }
];

export interface SqlExecutionResult {
  success: boolean;
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  executionPlan: string;
  queryType: string;
  error?: string;
}

export function executeSqlQuery(rawQuery: string, data: StudentRecord[] = INITIAL_STUDENTS): SqlExecutionResult {
  const start = performance.now();
  const trimmed = rawQuery.trim().replace(/;+$/, '');

  if (!trimmed) {
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs: 0,
      executionPlan: 'Error: Empty SQL query.',
      queryType: 'UNKNOWN',
      error: 'Please enter a valid SQL query.'
    };
  }

  // Basic SQL Syntax Validation
  const selectRegex = /^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?$/i;
  const match = trimmed.match(selectRegex);

  if (!match) {
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs: parseFloat((performance.now() - start).toFixed(2)),
      executionPlan: 'Syntax Error in SQL Parser.',
      queryType: 'INVALID',
      error: 'SQL Syntax Error. Supported syntax: SELECT [columns|*] FROM students [WHERE condition] [ORDER BY column [ASC|DESC]] [LIMIT n];'
    };
  }

  const [, selectClause, tableClause, whereClause, orderClause, limitClause] = match;

  if (tableClause.toLowerCase() !== 'students') {
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs: parseFloat((performance.now() - start).toFixed(2)),
      executionPlan: `Table '${tableClause}' not found.`,
      queryType: 'SELECT',
      error: `Table '${tableClause}' does not exist in schema. Available tables: students.`
    };
  }

  let filtered = [...data];
  let planDetails = 'Seq Scan on students (cost=0.00..12.50)';

  // 1. WHERE Filter
  if (whereClause) {
    planDetails += ` -> Filter: (${whereClause.trim()})`;
    try {
      filtered = filtered.filter(row => evaluateWhere(whereClause, row));
    } catch (err: any) {
      return {
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: parseFloat((performance.now() - start).toFixed(2)),
        executionPlan: 'Execution aborted during WHERE evaluation.',
        queryType: 'SELECT',
        error: `WHERE Clause Error: ${err.message || 'Invalid condition syntax'}`
      };
    }
  }

  // 2. ORDER BY Sort
  if (orderClause) {
    const parts = orderClause.trim().split(/\s+/);
    const orderCol = parts[0].toLowerCase();
    const isDesc = parts[1] && parts[1].toLowerCase() === 'desc';
    planDetails += ` -> Sort by: ${orderCol} ${isDesc ? 'DESC' : 'ASC'}`;

    filtered.sort((a: any, b: any) => {
      const valA = a[orderCol] ?? '';
      const valB = b[orderCol] ?? '';
      if (typeof valA === 'number' && typeof valB === 'number') {
        return isDesc ? valB - valA : valA - valB;
      }
      return isDesc ? String(valB).localeCompare(String(valA)) : String(valA).localeCompare(String(valB));
    });
  }

  // 3. LIMIT
  if (limitClause) {
    const limitNum = parseInt(limitClause, 10);
    if (!isNaN(limitNum)) {
      filtered = filtered.slice(0, limitNum);
      planDetails += ` -> Limit: ${limitNum}`;
    }
  }

  // 4. Column Projection
  let columns: string[] = [];
  let projectedRows: Record<string, any>[] = [];

  if (selectClause.trim() === '*') {
    columns = ['id', 'name', 'course', 'semester', 'gpa', 'credits', 'attendance'];
    projectedRows = filtered;
  } else {
    columns = selectClause.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
    projectedRows = filtered.map(row => {
      const projected: Record<string, any> = {};
      columns.forEach(col => {
        projected[col] = (row as any)[col] ?? null;
      });
      return projected;
    });
  }

  const duration = parseFloat((performance.now() - start).toFixed(2));

  return {
    success: true,
    columns,
    rows: projectedRows,
    rowCount: projectedRows.length,
    executionTimeMs: Math.max(0.12, duration),
    executionPlan: planDetails,
    queryType: 'SELECT'
  };
}

function evaluateWhere(clause: string, row: StudentRecord): boolean {
  // Support AND / OR
  const orTokens = clause.split(/\s+OR\s+/i);
  if (orTokens.length > 1) {
    return orTokens.some(token => evaluateWhere(token, row));
  }

  const andTokens = clause.split(/\s+AND\s+/i);
  if (andTokens.length > 1) {
    return andTokens.every(token => evaluateWhere(token, row));
  }

  const clean = clause.trim();
  const ops = ['>=', '<=', '!=', '<>', '=', '>', '<', 'LIKE'];
  let matchedOp = '';
  for (const op of ops) {
    const reg = new RegExp(`\\s+${op}\\s+|${op}`, 'i');
    if (reg.test(clean)) {
      matchedOp = op;
      break;
    }
  }

  if (!matchedOp) return true;

  const parts = clean.split(new RegExp(`\\s*${matchedOp}\\s*`, 'i'));
  const col = parts[0].trim().toLowerCase();
  const rawTarget = parts[1].trim().replace(/^['"]|['"]$/g, '');
  const rowVal = (row as any)[col];

  if (rowVal === undefined) {
    throw new Error(`Unknown column '${col}' in schema`);
  }

  if (matchedOp === 'LIKE') {
    const pattern = rawTarget.replace(/%/g, '.*');
    const regex = new RegExp(`^${pattern}$`, 'i');
    return regex.test(String(rowVal));
  }

  const numTarget = parseFloat(rawTarget);
  const isNum = !isNaN(numTarget) && typeof rowVal === 'number';

  switch (matchedOp) {
    case '>=':
      return isNum ? rowVal >= numTarget : String(rowVal) >= rawTarget;
    case '<=':
      return isNum ? rowVal <= numTarget : String(rowVal) <= rawTarget;
    case '>':
      return isNum ? rowVal > numTarget : String(rowVal) > rawTarget;
    case '<':
      return isNum ? rowVal < numTarget : String(rowVal) < rawTarget;
    case '=':
      return isNum ? rowVal === numTarget : String(rowVal).toLowerCase() === rawTarget.toLowerCase();
    case '!=':
    case '<>':
      return isNum ? rowVal !== numTarget : String(rowVal).toLowerCase() !== rawTarget.toLowerCase();
    default:
      return true;
  }
}
