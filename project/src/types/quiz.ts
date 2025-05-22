export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizProgress {
  currentQuestion: number;
  score: number;
  completed: boolean;
}