import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { getLocalIdeology } from './services/ideologyService';
import { FULL_QUESTION_BANK } from './quizQuestions';
import type { Question, Answer, IdeologyResult, ScoreHistory } from './types';

type GameState = 'welcome' | 'quiz' | 'results';

const QUESTIONS_PER_BATCH = 8;
const TOTAL_QUESTIONS = 40; // 5 batches of 8

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<IdeologyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scoreHistory, setScoreHistory] = useState<ScoreHistory[]>([]);
  const [askedQuestionIds, setAskedQuestionIds] = useState<Set<number>>(new Set());

  const calculateScores = useCallback((currentAnswers: Answer[], currentQuestions: Question[]): { economicScore: number, socialScore: number } => {
    let economicScore = 0;
    let socialScore = 0;
    const maxScorePerAxis = 100;

    const economicQuestions = currentQuestions.filter(q => q.axis === 'economic');
    const socialQuestions = currentQuestions.filter(q => q.axis === 'social');
    
    const economicAnswers = currentAnswers.filter(a => economicQuestions.some(q => q.id === a.questionId));
    const socialAnswers = currentAnswers.filter(a => socialQuestions.some(q => q.id === a.questionId));

    if (economicAnswers.length > 0) {
        const rawEconomicScore = economicAnswers.reduce((acc, answer) => {
            const question = currentQuestions.find(q => q.id === answer.questionId)!;
            return acc + (answer.value * question.weight);
        }, 0);
        economicScore = (rawEconomicScore / (economicAnswers.length * 2)) * maxScorePerAxis;
    }

    if (socialAnswers.length > 0) {
        const rawSocialScore = socialAnswers.reduce((acc, answer) => {
            const question = currentQuestions.find(q => q.id === answer.questionId)!;
            return acc + (answer.value * question.weight);
        }, 0);
        socialScore = (rawSocialScore / (socialAnswers.length * 2)) * maxScorePerAxis;
    }
    
    economicScore = Math.max(-maxScorePerAxis, Math.min(maxScorePerAxis, economicScore));
    socialScore = Math.max(-maxScorePerAxis, Math.min(maxScorePerAxis, socialScore));
    
    return { economicScore, socialScore };
  }, []);

    const selectNextQuestions = useCallback((currentBatchNumber: number, currentAnswers: Answer[], askedIds: Set<number>): Question[] => {
        const { economicScore, socialScore } = calculateScores(currentAnswers, questions);

        let targetQuadrant: Question['quadrant'];
        if (economicScore <= 0 && socialScore > 0) targetQuadrant = 'AuthLeft';
        else if (economicScore > 0 && socialScore > 0) targetQuadrant = 'AuthRight';
        else if (economicScore <= 0 && socialScore <= 0) targetQuadrant = 'LibLeft';
        else targetQuadrant = 'LibRight';

        const availableQuestions = FULL_QUESTION_BANK.filter(q => !askedIds.has(q.id));
        const nextSpecificity = currentBatchNumber + 1;

        let potentialQuestions = availableQuestions.filter(q =>
            q.specificity === nextSpecificity && q.quadrant === targetQuadrant
        );

        if (potentialQuestions.length < QUESTIONS_PER_BATCH) {
            const generalQuestions = availableQuestions.filter(q =>
                q.specificity === nextSpecificity && !q.quadrant
            );
            potentialQuestions.push(...generalQuestions);
        }
        
        if (potentialQuestions.length < QUESTIONS_PER_BATCH) {
            const anySpecificityMatch = availableQuestions.filter(q => q.specificity === nextSpecificity);
            potentialQuestions.push(...anySpecificityMatch);
        }

        const uniquePotentialQuestions = Array.from(new Set(potentialQuestions.map(q => q.id)))
            .map(id => potentialQuestions.find(q => q.id === id)!);

        return uniquePotentialQuestions.slice(0, QUESTIONS_PER_BATCH);
    }, [calculateScores, questions]);

  const handleStartQuiz = useCallback(() => {
    setError(null);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setScoreHistory([]);
    setResults(null);
    
    // Select initial questions locally
    const initialQuestions = FULL_QUESTION_BANK.filter(q => q.specificity === 1).slice(0, QUESTIONS_PER_BATCH);
    setQuestions(initialQuestions);
    setAskedQuestionIds(new Set(initialQuestions.map(q => q.id)));
    
    setGameState('quiz');
  }, []);

  const handleFinishQuiz = useCallback((finalAnswers: Answer[]) => {
    setError(null);
    try {
      const finalScores = calculateScores(finalAnswers, questions);
      const finalScoreHistory = [...scoreHistory, { ...finalScores, questionNumber: questions.length }];
      
      const ideology = getLocalIdeology(finalScores.economicScore, finalScores.socialScore);

      const finalResults = {
        ...finalScores,
        ideology,
        scoreHistory: finalScoreHistory,
      };

      setResults(finalResults);
      setGameState('results');

    } catch (err) {
      console.error(err);
      setError('An error occurred while calculating your results. Please try again.');
      setGameState('welcome');
    }
  }, [questions, calculateScores, scoreHistory]);


  const handleAnswer = useCallback((value: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id), { questionId: currentQuestion.id, value }];
    setAnswers(updatedAnswers);

    const isLastQuestionInBatch = (currentQuestionIndex + 1) % QUESTIONS_PER_BATCH === 0;
    const isLastQuestionInQuiz = currentQuestionIndex === TOTAL_QUESTIONS - 1;

    if (isLastQuestionInBatch && !isLastQuestionInQuiz) {
        const currentScores = calculateScores(updatedAnswers, questions.slice(0, currentQuestionIndex + 1));
        setScoreHistory(prev => [...prev, { ...currentScores, questionNumber: currentQuestionIndex + 1 }]);
        
        const currentBatchNumber = (currentQuestionIndex + 1) / QUESTIONS_PER_BATCH;
        const nextQuestions = selectNextQuestions(currentBatchNumber, updatedAnswers, askedQuestionIds);
        
        if (nextQuestions.length > 0) {
            setQuestions(prev => [...prev, ...nextQuestions]);
            setAskedQuestionIds(prev => new Set([...prev, ...nextQuestions.map(q => q.id)]));
        } else {
            // Not enough questions left, finish early
            handleFinishQuiz(updatedAnswers);
            return;
        }
    }

    if (isLastQuestionInQuiz) {
        handleFinishQuiz(updatedAnswers);
    } else {
        setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [questions, answers, currentQuestionIndex, handleFinishQuiz, calculateScores, askedQuestionIds, selectNextQuestions]);

  const handleRetakeQuiz = useCallback(() => {
    setGameState('welcome');
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStartQuiz} error={error} />;
      case 'quiz':
        return (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            onAnswer={handleAnswer}
          />
        );
      case 'results':
        return results ? <ResultsScreen results={results} onRetake={handleRetakeQuiz} /> : <LoadingScreen message="Loading results..." />;
      default:
        return <WelcomeScreen onStart={handleStartQuiz} error={error} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;