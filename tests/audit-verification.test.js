const fs = require('fs');
const path = require('path');
const assert = require('assert');

const baseDir = path.resolve(__dirname, '..');

function testAuditVerification() {
  console.log('Running Task 1 Audit Verification Tests...');

  // 1. Check inventory CSV
  const inventoryPath = path.join(baseDir, 'audit-reports', 'file-inventory.csv');
  assert.ok(fs.existsSync(inventoryPath), 'file-inventory.csv must exist');
  const inventoryLines = fs.readFileSync(inventoryPath, 'utf8').trim().split('\n');
  assert.ok(inventoryLines.length >= 79, `Inventory must have at least 79 rows, got ${inventoryLines.length}`);
  console.log(`[PASS] Inventory CSV has ${inventoryLines.length - 1} indexed files.`);

  // 2. Check duplicate report CSV
  const dupPath = path.join(baseDir, 'audit-reports', 'duplicate-report.csv');
  assert.ok(fs.existsSync(dupPath), 'duplicate-report.csv must exist');
  const dupContent = fs.readFileSync(dupPath, 'utf8');
  assert.ok(dupContent.includes('MODULE 4'), 'Duplicate report must detect MODULE 4 duplicates');
  console.log('[PASS] Duplicate report accurately flags duplicate group.');

  // 3. Check resource-index.json
  const resIndexPath = path.join(baseDir, 'resource-index.json');
  assert.ok(fs.existsSync(resIndexPath), 'resource-index.json must exist');
  const resIndex = JSON.parse(fs.readFileSync(resIndexPath, 'utf8'));
  assert.ok(resIndex.subjects['cst303-computer-networks'], 'Must index CST303');
  assert.ok(resIndex.subjects['cst205-object-oriented-programming'], 'Must index CST205 Java');
  assert.ok(resIndex.metadata.faculty.includes('Jane Rose'), 'Faculty branding must be present');
  console.log('[PASS] resource-index.json metadata and subject mapping verified.');

  // 4. Check validation-report.md
  const valRepPath = path.join(baseDir, 'audit-reports', 'validation-report.md');
  assert.ok(fs.existsSync(valRepPath), 'validation-report.md must exist');
  console.log('[PASS] validation-report.md verified.');

  console.log('All Task 1 verification tests PASSED successfully!');
}

testAuditVerification();
