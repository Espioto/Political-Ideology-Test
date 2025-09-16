
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
  error: string | null;
}

const CompassIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 0l2-2m-2 2l2 2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12l-2-2m2 2l-2 2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6" />
  </svg>
);


export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, error }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center max-w-2xl mx-auto border border-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-cyan-500/20">
      <div className="flex justify-center">
        <CompassIcon />
      </div>
      <h1 className="text-4xl font-bold text-white mb-3">Political Ideology Test</h1>
      <p className="text-gray-300 text-lg mb-6">
        Discover where you land on the political spectrum. You will be presented with a series of statements. For each one, please indicate how much you agree or disagree.
      </p>
      <p className="text-gray-400 text-sm mb-6 px-4">
        Please note: This test is designed for educational and entertainment purposes. It provides an estimate of your political standing and is not a definitive psychological or political analysis.
      </p>
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <button
        onClick={onStart}
        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full text-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
      >
        Start the Test
      </button>
    </div>
  );
};