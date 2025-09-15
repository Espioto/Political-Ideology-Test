export interface Question {
  id: number;
  text: string;
  explanation?: string; // Optional context for the question
  axis: 'economic' | 'social';
  weight: -1 | 1; // -1 for Left/Libertarian, 1 for Right/Authoritarian
  specificity: number; // 1 (broad) to 5 (very specific)
  quadrant?: 'AuthLeft' | 'AuthRight' | 'LibLeft' | 'LibRight';
}

export interface Answer {
  questionId: number;
  value: number; // -2 (Disagree) to 2 (Agree)
}

export interface Ideology {
  name: string;
  description: string;
  country: {
    name: string;
    reasoning: string;
    svgFlag: string;
  };
  usPartyAlignment: {
    party: 'Democrat' | 'Republican' | 'Independent';
    reasoning: string;
    disagreements: string;
  };
}

export interface ScoreHistory {
  economicScore: number;
  socialScore: number;
  questionNumber: number;
}

export interface IdeologyResult {
  economicScore: number;
  socialScore: number;
  ideology: Ideology;
  scoreHistory: ScoreHistory[];
}