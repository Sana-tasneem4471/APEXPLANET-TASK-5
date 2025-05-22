import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types/quiz';
import { questions } from '../data/quizQuestions';
import { getStoredProgress, updateProgress } from '../utils/progressStorage';

export const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Load progress when component mounts
  useEffect(() => {
    const progress = getStoredProgress();
    if (progress) {
      setCurrentQuestionIndex(progress.currentQuestion);
      setScore(progress.score);
      setQuizCompleted(progress.completed);
    }
  }, []);

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setIsCorrect(option === currentQuestion.correctAnswer);
    setShowFeedback(true);
    
    if (option === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    // Save progress after answering
    updateProgress({
      currentQuestion: currentQuestionIndex,
      score,
      completed: quizCompleted,
    });
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
      updateProgress({
        currentQuestion: currentQuestionIndex,
        score: score + (isCorrect ? 1 : 0),
        completed: true,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
    updateProgress({
      currentQuestion: 0,
      score: 0,
      completed: false,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Interactive Web Dev Quiz</h2>
      
      {!quizCompleted ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300">
          <div className="mb-4 flex justify-between">
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Score: {score}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`
                  w-full text-left p-4 rounded-lg transition-all duration-300 border
                  ${selectedOption === option ? 
                    isCorrect ? 
                      'bg-green-100 border-green-400 dark:bg-green-900 dark:border-green-700' : 
                      'bg-red-100 border-red-400 dark:bg-red-900 dark:border-red-700' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'}
                `}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
          
          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg border ${
              isCorrect ? 
                'bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-100' : 
                'bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                ) : (
                  <XCircle className="text-red-600 dark:text-red-400" size={24} />
                )}
                <p className="font-medium">
                  {isCorrect ? 'Correct!' : `Incorrect. The correct answer is "${currentQuestion.correctAnswer}".`}
                </p>
              </div>
              {currentQuestion.explanation && (
                <p className="mt-2">{currentQuestion.explanation}</p>
              )}
              <button 
                onClick={handleNextQuestion}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center transition-all duration-300">
          <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
          <p className="text-xl mb-6">
            Your final score: <span className="font-bold text-blue-600 dark:text-blue-400">{score} out of {questions.length}</span>
          </p>
          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};