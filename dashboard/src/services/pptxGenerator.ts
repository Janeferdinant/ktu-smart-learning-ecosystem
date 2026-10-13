import pptxgen from 'pptxgenjs';
import { Subject, SubjectModule } from '../types/academic';

export interface PptxOptions {
  includeSpeakerNotes?: boolean;
}

export const generateModulePresentation = async (
  subject: Subject,
  module: SubjectModule,
  options: PptxOptions = {}
): Promise<void> => {
  const pptx = new pptxgen();

  // 16:9 widescreen format
  pptx.layout = 'LAYOUT_16x9';

  // Dedicated High-Contrast Academic LIGHT THEME Palette
  const THEME = {
    bgLight: 'F8FAFC',
    cardBg: 'FFFFFF',
    textNavy: '1E3A8A',
    textDark: '0F172A',
    textMuted: '475569',
    accentBlue: '2563EB',
    accentCyan: '0284C7',
    borderLight: 'E2E8F0',
    footerText: '64748B'
  };

  const FOOTER_TEXT = 'Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)';
  const INSTITUTION_TEXT = 'APJ Abdul Kalam Technological University (KTU) | ' + subject.regulation;

  // Helper for applying consistent Light Theme Master template to each slide
  const applyMasterLayout = (slide: pptxgen.Slide, slideTitle: string, category: string = 'MODULE OVERVIEW') => {
    // Light background
    slide.background = { color: THEME.bgLight };

    // Header top bar
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 0.4,
      w: 12.33,
      h: 0.8,
      fill: { color: THEME.cardBg },
      line: { color: THEME.borderLight, width: 1 }
    });

    slide.addText(category.toUpperCase(), {
      x: 0.7,
      y: 0.45,
      w: 8.0,
      h: 0.25,
      fontSize: 9,
      bold: true,
      color: THEME.accentBlue,
      fontFace: 'Arial'
    });

    slide.addText(slideTitle, {
      x: 0.7,
      y: 0.65,
      w: 9.0,
      h: 0.45,
      fontSize: 16,
      bold: true,
      color: THEME.textNavy,
      fontFace: 'Arial'
    });

    // Subject badge top-right
    slide.addText(`${subject.code} — M0${module.moduleNumber}`, {
      x: 9.5,
      y: 0.55,
      w: 3.1,
      h: 0.4,
      fontSize: 11,
      bold: true,
      align: 'right',
      color: THEME.textMuted,
      fontFace: 'Arial'
    });

    // Official Faculty Footer on every slide
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 7.0,
      w: 12.33,
      h: 0,
      line: { color: THEME.borderLight, width: 1 }
    });

    slide.addText(FOOTER_TEXT, {
      x: 0.5,
      y: 7.05,
      w: 8.5,
      h: 0.35,
      fontSize: 9,
      color: THEME.footerText,
      fontFace: 'Arial'
    });

    slide.addText(INSTITUTION_TEXT, {
      x: 8.5,
      y: 7.05,
      w: 4.33,
      h: 0.35,
      fontSize: 9,
      align: 'right',
      color: THEME.footerText,
      fontFace: 'Arial'
    });
  };

  // ==========================================
  // SLIDE 1: TITLE SLIDE (Light Theme)
  // ==========================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: THEME.bgLight };

  // Decorative blue header bar
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.25,
    fill: { color: THEME.accentBlue }
  });

  // Hero Card
  slide1.addShape(pptx.ShapeType.rect, {
    x: 1.0,
    y: 1.2,
    w: 11.33,
    h: 4.8,
    fill: { color: THEME.cardBg },
    line: { color: THEME.borderLight, width: 1 }
  });

  slide1.addText('APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY (KTU)', {
    x: 1.5,
    y: 1.6,
    w: 10.33,
    h: 0.4,
    fontSize: 12,
    bold: true,
    color: THEME.accentBlue,
    fontFace: 'Arial'
  });

  slide1.addText(`${subject.code} — ${subject.name.toUpperCase()}`, {
    x: 1.5,
    y: 2.1,
    w: 10.33,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: THEME.textNavy,
    fontFace: 'Arial'
  });

  slide1.addText(`MODULE 0${module.moduleNumber}: ${module.title.toUpperCase()}`, {
    x: 1.5,
    y: 2.8,
    w: 10.33,
    h: 0.6,
    fontSize: 18,
    bold: true,
    color: THEME.accentCyan,
    fontFace: 'Arial'
  });

  slide1.addText(`Teaching Hours Allocated: ${module.hoursAllocated} Hours | ${subject.semester} | ${subject.regulation}`, {
    x: 1.5,
    y: 3.5,
    w: 10.33,
    h: 0.4,
    fontSize: 12,
    color: THEME.textMuted,
    fontFace: 'Arial'
  });

  // Faculty credentials box
  slide1.addShape(pptx.ShapeType.rect, {
    x: 1.5,
    y: 4.2,
    w: 10.33,
    h: 1.2,
    fill: { color: THEME.bgLight },
    line: { color: THEME.borderLight, width: 1 }
  });

  slide1.addText('Course Faculty & Presentation Author:', {
    x: 1.8,
    y: 4.35,
    w: 9.5,
    h: 0.3,
    fontSize: 10,
    bold: true,
    color: THEME.accentBlue,
    fontFace: 'Arial'
  });

  slide1.addText(FOOTER_TEXT, {
    x: 1.8,
    y: 4.7,
    w: 9.5,
    h: 0.4,
    fontSize: 13,
    bold: true,
    color: THEME.textNavy,
    fontFace: 'Arial'
  });

  // ==========================================
  // SLIDE 2: MODULE LEARNING OBJECTIVES
  // ==========================================
  const slide2 = pptx.addSlide();
  applyMasterLayout(slide2, 'Module Learning Objectives & Syllabus Outcomes', 'SECTION 1');

  slide2.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.5,
    w: 11.73,
    h: 5.1,
    fill: { color: THEME.cardBg },
    line: { color: THEME.borderLight, width: 1 }
  });

  const objItems = [
    { text: 'Analyze and comprehend the core theoretical foundations prescribed in KTU Syllabus.', options: { bullet: true, fontSize: 13, color: THEME.textDark } },
    { text: `Master key concepts: ${module.keyTopics.slice(0, 3).join(', ')}.`, options: { bullet: true, fontSize: 13, color: THEME.textDark } },
    { text: 'Formulate algorithmic and mathematical solutions for university examination problems.', options: { bullet: true, fontSize: 13, color: THEME.textDark } },
    { text: 'Relate theoretical abstractions to industry standards and modern enterprise deployments.', options: { bullet: true, fontSize: 13, color: THEME.textDark } },
    { text: 'Apply analytical debugging and verification techniques in laboratory exercises.', options: { bullet: true, fontSize: 13, color: THEME.textDark } }
  ];

  slide2.addText(objItems, {
    x: 1.2,
    y: 1.9,
    w: 10.9,
    h: 4.2,
    lineSpacing: 24,
    fontFace: 'Arial'
  });

  // ==========================================
  // SLIDE 3: CORE ARCHITECTURAL CONCEPTS
  // ==========================================
  const slide3 = pptx.addSlide();
  applyMasterLayout(slide3, 'Core Architecture & Technical Framework', 'SECTION 2');

  // Left card
  slide3.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.5,
    w: 5.6,
    h: 5.1,
    fill: { color: THEME.cardBg },
    line: { color: THEME.borderLight, width: 1 }
  });

  slide3.addText('Syllabus Prescribed Topics', {
    x: 1.1,
    y: 1.7,
    w: 5.0,
    h: 0.4,
    fontSize: 14,
    bold: true,
    color: THEME.textNavy,
    fontFace: 'Arial'
  });

  const topicList = module.keyTopics.map(t => ({
    text: t,
    options: { bullet: true, fontSize: 11, color: THEME.textDark }
  }));

  slide3.addText(topicList, {
    x: 1.1,
    y: 2.2,
    w: 5.0,
    h: 4.0,
    lineSpacing: 18,
    fontFace: 'Arial'
  });

  // Right card: Concept Synthesis
  slide3.addShape(pptx.ShapeType.rect, {
    x: 6.9,
    y: 1.5,
    w: 5.6,
    h: 5.1,
    fill: { color: THEME.cardBg },
    line: { color: THEME.borderLight, width: 1 }
  });

  slide3.addText('Engineering Analysis & Insights', {
    x: 7.2,
    y: 1.7,
    w: 5.0,
    h: 0.4,
    fontSize: 14,
    bold: true,
    color: THEME.accentBlue,
    fontFace: 'Arial'
  });

  const insightsList = [
    { text: 'Layered encapsulation enforces modular abstraction and decoupling across protocol stacks.', options: { bullet: true, fontSize: 11, color: THEME.textDark } },
    { text: 'Performance trade-offs: Throughput, propagation latency, queuing delay, and computational overhead.', options: { bullet: true, fontSize: 11, color: THEME.textDark } },
    { text: 'Error handling combines parity polynomials (CRC) with sliding window flow control guarantees.', options: { bullet: true, fontSize: 11, color: THEME.textDark } },
    { text: 'KTU Exam Tip: Always draw clean labeled block diagrams with proper protocol sequence flows.', options: { bullet: true, fontSize: 11, color: 'B91C1C' } }
  ];

  slide3.addText(insightsList, {
    x: 7.2,
    y: 2.2,
    w: 5.0,
    h: 4.0,
    lineSpacing: 20,
    fontFace: 'Arial'
  });

  // ==========================================
  // SLIDE 4: IMPORTANT UNIVERSITY EXAM QUESTIONS
  // ==========================================
  const slide4 = pptx.addSlide();
  applyMasterLayout(slide4, 'University Examination Question Bank & Rubrics', 'SECTION 3');

  slide4.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.5,
    w: 11.73,
    h: 5.1,
    fill: { color: THEME.cardBg },
    line: { color: THEME.borderLight, width: 1 }
  });

  const examQuestions = [
    { text: '1. Part A (3 Marks): State the core objective and define the architectural principles of this module.', options: { bullet: true, fontSize: 12, bold: true, color: THEME.textNavy } },
    { text: '   -> Answer criteria: Accurate definition (1 Mark), Block diagram/formula (1 Mark), Example application (1 Mark).', options: { fontSize: 11, color: THEME.textMuted } },
    { text: '2. Part B (14 Marks): Explain the mechanism with a detailed architecture diagram and step-by-step mathematical derivation.', options: { bullet: true, fontSize: 12, bold: true, color: THEME.textNavy } },
    { text: '   -> Answer criteria: Neatly labeled diagram (4 Marks), Step-by-step algorithm explanation (6 Marks), Analysis of corner cases (4 Marks).', options: { fontSize: 11, color: THEME.textMuted } },
    { text: '3. Numerical Problem (14 Marks): Solve the parameter optimization problem using official KTU evaluation scheme criteria.', options: { bullet: true, fontSize: 12, bold: true, color: THEME.textNavy } },
    { text: '   -> Answer criteria: Formula specification (3 Marks), Intermediate calculation matrix (7 Marks), Final result with units (4 Marks).', options: { fontSize: 11, color: THEME.textMuted } }
  ];

  slide4.addText(examQuestions, {
    x: 1.2,
    y: 1.9,
    w: 10.9,
    h: 4.2,
    lineSpacing: 20,
    fontFace: 'Arial'
  });

  // ==========================================
  // SLIDE 5: SUMMARY & REFERENCES
  // ==========================================
  const slide5 = pptx.addSlide();
  applyMasterLayout(slide5, 'Module Summary, Textbooks & IEEE References', 'SECTION 4');

  slide5.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.5,
    w: 11.73,
    h: 5.1,
    fill: { color: THEME.cardBg },
    line: { color: THEME.borderLight, width: 1 }
  });

  const refItems = [
    { text: 'Recommended Textbooks & References:', options: { fontSize: 13, bold: true, color: THEME.textNavy } },
    { text: '• Andrew S. Tanenbaum, David J. Wetherall, "Computer Networks", 5th Edition, Pearson.', options: { fontSize: 11, color: THEME.textDark } },
    { text: '• Behrouz A. Forouzan, "Data Communications and Networking", 5th Edition, McGraw Hill.', options: { fontSize: 11, color: THEME.textDark } },
    { text: '• Herbert Schildt, "Java: The Complete Reference", 11th Edition, Oracle Press.', options: { fontSize: 11, color: THEME.textDark } },
    { text: 'Key Milestone Takeaways:', options: { fontSize: 13, bold: true, color: THEME.textNavy } },
    { text: `• Successfully completed all prescribed topics for Module 0${module.moduleNumber} (${module.hoursAllocated} Hours).`, options: { fontSize: 11, color: THEME.accentBlue } },
    { text: '• Practice the official question bank in the KTU Assessment Centre to test your readiness.', options: { fontSize: 11, color: THEME.textDark } }
  ];

  slide5.addText(refItems, {
    x: 1.2,
    y: 1.9,
    w: 10.9,
    h: 4.2,
    lineSpacing: 22,
    fontFace: 'Arial'
  });

  // Save the presentation in browser
  const filename = `${subject.code}_Module_0${module.moduleNumber}_Presentation_Light.pptx`;
  await pptx.writeFile({ fileName: filename });
};
