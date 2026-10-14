export interface ModuleResource {
  id: string;
  name: string;
  type: 'notes' | 'presentation' | 'question-bank' | 'answer-key' | 'lab' | 'reference' | 'code';
  sizeBytes: number;
  filename: string;
  originalPath: string;
  description?: string;
}

export interface SubjectModule {
  id: number;
  moduleNumber: number;
  title: string;
  description: string;
  hoursAllocated: number;
  keyTopics: string[];
  resources: ModuleResource[];
}

export interface QuestionPaper {
  id: string;
  title: string;
  examMonthYear: string;
  scheme: string;
  category: 'university-pyq' | 'model-paper' | 'series-exam';
  hasSolution: boolean;
  filename: string;
  sizeBytes: number;
}

export interface AnswerKeyScheme {
  id: string;
  title: string;
  examMonthYear: string;
  type: 'official-valuation-scheme' | 'draft-scheme' | 'model-solution';
  filename: string;
  sizeBytes: number;
  keyHighlights: string[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: string;
  credits: number;
  regulation: string;
  faculty: string;
  description: string;
  icon: string;
  gradient: string;
  modules: SubjectModule[];
  questionPapers: QuestionPaper[];
  answerKeys: AnswerKeyScheme[];
  showcaseUrl?: string;
}
