export interface Condition {
  id: number;
  questionId: number;
  dependsOnId: number;
  expectedValue: string;
}

export interface Option {
  id: number;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  questionTypeId: number;
  options?: Option[];
  condition?: Condition;
}

export interface FormSection {
  id: number;
  priority: number;
  title: string;
  questions: Question[];
}
