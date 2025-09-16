import React, { useState, useEffect } from 'react';
import type { Question } from '../types';

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
}

const answerOptions = [
  { label: 'Disagree', value: -2, color: 'bg-red-600', hover: 'hover:bg-red-500' },
  { label: 'Sometimes Disagree', value: -1, color: 'bg-orange-700', hover: 'hover:bg-orange-600' },
  { label: 'Neutral', value: 0, color: 'bg-gray-600', hover: 'hover:bg-gray-500' },
  { label: 'Sometimes Agree', value: 1, color: 'bg-teal-700', hover: 'hover:bg-teal-600' },
  { label: 'Agree', value: 2, color: 'bg-green-600', hover: 'hover:bg-green-500' },
];

export const QuizScreen: React.FC<QuizScreenProps> = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const progress = (questionNumber / totalQuestions) * 100;

  useEffect(() => {
    setShowExplanation(false);
  }, [question]);

  if (!question) {
    return <div className="text-center text-xl">Loading question...</div>;
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full border border-gray-700">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-300">Question {questionNumber} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
        </div>
      </div>

      <div className="text-center mb-8 min-h-[120px] flex items-center justify-center flex-col">
        <p className="text-2xl font-medium text-white">"{question.text}"</p>
        {question.explanation && (
          <div className="mt-4">
              <button 
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  aria-expanded={showExplanation}
              >
                  {showExplanation ? 'Hide info' : 'Why is this asked?'}
              </button>
              {showExplanation && (
                  <p className="text-sm text-gray-300 mt-2 p-3 bg-gray-900/50 rounded-lg border border-gray-600 max-w-prose mx-auto">
                      {question.explanation}
                  </p>
              )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {answerOptions.map(({ label, value, color, hover }) => (
          <button
            key={value}
            onClick={() => onAnswer(value)}
            className={`text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${color} ${hover}`}
            aria-label={`Answer: ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};