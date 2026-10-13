const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const subjectsDir = path.join(baseDir, 'subjects');

const structure = [
  'cst303-computer-networks/modules/module-01/notes',
  'cst303-computer-networks/modules/module-02/notes',
  'cst303-computer-networks/modules/module-03/notes',
  'cst303-computer-networks/modules/module-04/notes',
  'cst303-computer-networks/modules/module-05/notes',
  'cst303-computer-networks/question-papers/previous-year',
  'cst303-computer-networks/question-papers/model-papers',
  'cst303-computer-networks/question-papers/answer-keys',
  'cst303-computer-networks/teaching-plan',
  'cst303-computer-networks/laboratory',
  
  'cst205-object-oriented-programming/modules/module-01/presentations',
  'cst205-object-oriented-programming/modules/module-02/presentations',
  'cst205-object-oriented-programming/modules/module-03/presentations',
  'cst205-object-oriented-programming/modules/module-04/presentations',
  'cst205-object-oriented-programming/modules/module-05/presentations',
  'cst205-object-oriented-programming/supplementary',
  'cst205-object-oriented-programming/teaching-plan',

  'pcadt502-robotics/modules/module-01/notes',
  'pcadt502-robotics/teaching-plan',

  'pecst521-software-project-management/modules/module-01/notes',
  'pecst521-software-project-management/teaching-plan',

  'cst305-artificial-intelligence/references',
  'cst307-data-mining/modules/module-01',
  'embedded-systems-stm32/references'
];

for (const dir of structure) {
  const full = path.join(subjectsDir, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
}

console.log('Structured subject folders created successfully.');
