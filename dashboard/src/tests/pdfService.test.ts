import { describe, it, expect, vi } from 'vitest';
import { generateFallbackAcademicPdf, generateModuleSlidePdf } from '../services/pdfService';
import { ACADEMIC_SUBJECTS } from '../data/academicData';

describe('PDF Service', () => {
  it('generates a valid academic document PDF without error', () => {
    // jsPDF save can be mocked in test environment
    expect(() => {
      generateFallbackAcademicPdf(
        'test_qp.pdf',
        'CST303 University Question Paper - Dec 2022',
        'KTU 2019 Scheme',
        ['Mark allocation verified', 'CRC division rubrics']
      );
    }).not.toThrow();
  });

  it('generates a valid module slide PDF in Light Theme without error', () => {
    const subject = ACADEMIC_SUBJECTS[0];
    const module = subject.modules[0];
    expect(() => {
      generateModuleSlidePdf(subject, module);
    }).not.toThrow();
  });
});
