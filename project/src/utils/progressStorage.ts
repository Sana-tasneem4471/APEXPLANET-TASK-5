import { QuizProgress } from '../types/quiz';

const PROGRESS_KEY = 'quiz_progress';
const STORAGE_VERSION = '1.0';

interface StoredProgress extends QuizProgress {
  version: string;
  timestamp: number;
}

const isValidProgress = (data: any): data is StoredProgress => {
  return (
    data &&
    typeof data.currentQuestion === 'number' &&
    typeof data.score === 'number' &&
    typeof data.completed === 'boolean' &&
    typeof data.version === 'string' &&
    typeof data.timestamp === 'number'
  );
};

export const getStoredProgress = (): QuizProgress | null => {
  try {
    const storedData = localStorage.getItem(PROGRESS_KEY);
    if (!storedData) return null;

    const parsedData = JSON.parse(storedData);
    
    if (!isValidProgress(parsedData)) {
      console.warn('Invalid progress data found, resetting...');
      localStorage.removeItem(PROGRESS_KEY);
      return null;
    }

    // Check if data is older than 24 hours
    const isExpired = Date.now() - parsedData.timestamp > 24 * 60 * 60 * 1000;
    if (isExpired) {
      console.log('Progress data expired, resetting...');
      localStorage.removeItem(PROGRESS_KEY);
      return null;
    }

    const { currentQuestion, score, completed } = parsedData;
    return { currentQuestion, score, completed };
  } catch (error) {
    console.error('Error retrieving progress from localStorage:', error);
    return null;
  }
};

export const updateProgress = (progress: QuizProgress): void => {
  try {
    const progressWithMeta: StoredProgress = {
      ...progress,
      version: STORAGE_VERSION,
      timestamp: Date.now(),
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressWithMeta));
  } catch (error) {
    console.error('Error storing progress in localStorage:', error);
  }
};

export const clearProgress = (): void => {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.error('Error clearing progress from localStorage:', error);
  }
};