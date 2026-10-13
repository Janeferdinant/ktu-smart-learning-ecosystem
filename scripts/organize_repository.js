const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function moveFile(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    fs.unlinkSync(src);
    console.log(`Moved: ${path.basename(src)} -> ${path.relative(rootDir, dest)}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
}

// 1. Move root CST303 Question Papers & Answer Keys
const rootQps = [
  { file: 'B1 CST303 CN QP - Dec 2022.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'B1 CST303 CN QP1 - Dec 2022.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'B2 CST303 CN QP SCHEME1-Dec 2022.pdf', dest: 'subjects/cst303-computer-networks/question-papers/answer-keys/' },
  { file: 'CST303 COMPUTER NETWORKS, DECEMBER 2021 (1).pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'CST303-DRAFT SCHEME1.pdf', dest: 'subjects/cst303-computer-networks/question-papers/answer-keys/' },
  { file: 'CST303-QP (2).pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'CST303-QP (4).pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'CST303-QP.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'Qp-2022.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 's6-b-tech-computer-networks-april-2018.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 's6-cs-computer-networks-may-2019-1.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'second series question bank.pdf', dest: 'subjects/cst303-computer-networks/modules/module-04/question-bank/' },
  { file: 'q3.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'qstn 1.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'qstn2.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'qstn3.pdf', dest: 'subjects/cst303-computer-networks/question-papers/previous-year/' },
  { file: 'PCCST501_Computer_Networks_Model_Paper_Set_1.pdf', dest: 'subjects/cst303-computer-networks/question-papers/model-papers/' },
  { file: 'PCCST501_Computer_Networks_Model_Paper_Set_2.pdf', dest: 'subjects/cst303-computer-networks/question-papers/model-papers/' },
  { file: 'PCCST501_Computer_Networks_Model_Paper_Set_3.pdf', dest: 'subjects/cst303-computer-networks/question-papers/model-papers/' },
  { file: 'PCCST501_Computer_Networks_Model_Paper_Set_4.pdf', dest: 'subjects/cst303-computer-networks/question-papers/model-papers/' },
  { file: 'PCCST501_Computer_Networks_Model_Paper_Set_5.pdf', dest: 'subjects/cst303-computer-networks/question-papers/model-papers/' }
];

rootQps.forEach(item => {
  const src = path.join(rootDir, item.file);
  const dest = path.join(rootDir, item.dest, item.file);
  moveFile(src, dest);
});

// 2. Move CST303 Module 4 Notes & Presentations
const rootModule4 = [
  { file: 'MODULE 4 (1).pdf', dest: 'subjects/cst303-computer-networks/modules/module-04/notes/' },
  { file: 'MODULE 4 .pptx.pdf', dest: 'subjects/cst303-computer-networks/modules/module-04/presentations/' },
  { file: 'module 4 mc (1).pptx', dest: 'subjects/cst303-computer-networks/modules/module-04/presentations/' },
  { file: 'module 4.docx', dest: 'subjects/cst303-computer-networks/modules/module-04/notes/' },
  { file: 'OSPF_Routing.pdf', dest: 'subjects/cst303-computer-networks/laboratory/' },
  { file: 'RIPv2_Routing.pdf', dest: 'subjects/cst303-computer-networks/laboratory/' },
  { file: 'MOGO_FINAL_Project_Report.pdf', dest: 'subjects/cst303-computer-networks/industry-applications/' }
];

rootModule4.forEach(item => {
  const src = path.join(rootDir, item.file);
  const dest = path.join(rootDir, item.dest, item.file);
  moveFile(src, dest);
});

// 3. Remove redundant exact duplicate copies (MODULE 4 (2)-(4).pdf)
['MODULE 4 (2).pdf', 'MODULE 4 (3).pdf', 'MODULE 4 (4).pdf'].forEach(dup => {
  const dupPath = path.join(rootDir, dup);
  if (fs.existsSync(dupPath)) {
    fs.unlinkSync(dupPath);
    console.log(`Deduplicated: Removed redundant duplicate copy ${dup}`);
  }
});

// 4. Move other subjects in root
const otherRootSubjects = [
  { file: 'Mastering STM32.pdf', dest: 'subjects/embedded-systems-stm32/references/' },
  { file: 'S5 PCADT502 Robotics Module 1.pdf', dest: 'subjects/pcadt502-robotics/modules/module-01/notes/' },
  { file: 'S5 PECST521 SPM Module 1.pdf', dest: 'subjects/pecst521-software-project-management/modules/module-01/notes/' }
];

otherRootSubjects.forEach(item => {
  const src = path.join(rootDir, item.file);
  const dest = path.join(rootDir, item.dest, item.file);
  moveFile(src, dest);
});

// 5. Move files from EXTRA/
const extraDir = path.join(rootDir, 'EXTRA');
if (fs.existsSync(extraDir)) {
  const extraFiles = fs.readdirSync(extraDir);
  extraFiles.forEach(file => {
    const src = path.join(extraDir, file);
    let destSubDir = 'shared-assets/documents/';
    if (file.includes('AI Guide') || file.includes('AI Textbook')) {
      destSubDir = 'subjects/cst305-artificial-intelligence/references/';
    } else if (file.includes('FP GROWTH')) {
      destSubDir = 'subjects/cst307-data-mining/modules/module-01/';
    } else if (file.includes('SOLID') || file.includes('design patteens')) {
      destSubDir = 'subjects/cst205-object-oriented-programming/supplementary/';
    } else if (file.includes('MODULE IV Notes FINAL')) {
      destSubDir = 'subjects/cst303-computer-networks/modules/module-04/notes/';
    } else if (file.includes('MCP') || file.includes('NVIDIA')) {
      destSubDir = 'shared-assets/career-certifications/';
    }
    const dest = path.join(rootDir, destSubDir, file);
    moveFile(src, dest);
  });
  try {
    fs.rmdirSync(extraDir);
    console.log('Removed empty directory: EXTRA');
  } catch (e) {}
}

// 6. Move files from oops/
const oopsDir = path.join(rootDir, 'oops');
if (fs.existsSync(oopsDir)) {
  const oopsFiles = fs.readdirSync(oopsDir);
  oopsFiles.forEach(file => {
    const src = path.join(oopsDir, file);
    let moduleFolder = 'module-01';
    if (file.startsWith('2.') || file.toLowerCase().includes('polymorphism') || file.toLowerCase().includes('inheritance')) {
      moduleFolder = 'module-02';
    } else if (file.startsWith('M3') || file.toLowerCase().includes('exception')) {
      moduleFolder = 'module-03';
    } else if (file.startsWith('M4') || file.toLowerCase().includes('swing') || file.toLowerCase().includes('awt')) {
      moduleFolder = 'module-04';
    } else if (file.startsWith('M5') || file.toLowerCase().includes('jdbc')) {
      moduleFolder = 'module-05';
    }
    const dest = path.join(rootDir, `subjects/cst205-object-oriented-programming/modules/${moduleFolder}/presentations/`, file);
    moveFile(src, dest);
  });
  try {
    fs.rmdirSync(oopsDir);
    console.log('Removed empty directory: oops');
  } catch (e) {}
}

console.log('--- REPOSITORY ORGANIZATION COMPLETE ---');
