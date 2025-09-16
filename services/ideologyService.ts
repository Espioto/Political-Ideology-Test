import type { Ideology } from '../types';
import { IDEOLOGIES, DEFAULT_IDEOLOGY } from './ideologies';

/**
 * Finds the most suitable political ideology from a predefined list based on the user's scores.
 *
 * This function iterates through a list of ideologies, each defined with specific score ranges
 * for the economic and social axes. It returns the first ideology that matches the user's
 * scores. If no specific ideology matches, it returns a default "Centrist" ideology.
 *
 * @param {number} economicScore - The user's score on the economic axis (-100 to 100).
 * @param {number} socialScore - The user's score on the social axis (-100 to 100).
 * @returns {Ideology} The ideology object that best matches the provided scores.
 */
export const getLocalIdeology = (economicScore: number, socialScore: number): Ideology => {
  const matchedIdeology = IDEOLOGIES.find(ideology => 
    economicScore >= ideology.scores.econ.min && economicScore <= ideology.scores.econ.max &&
    socialScore >= ideology.scores.soc.min && socialScore <= ideology.scores.soc.max
  );

  return matchedIdeology || DEFAULT_IDEOLOGY;
};
