import type { Question } from './types';

// This is a pre-generated bank of questions. 
// In a real-world scenario, this might be generated once using an AI prompt and then saved statically.
// The local adaptation logic will pull from this list.
export const FULL_QUESTION_BANK: Question[] = [
  // === Specificity 1: Broad Foundational Questions ===
  { id: 1, text: "Government regulation of the economy is often necessary to protect consumers and the environment.", axis: 'economic', weight: -1, specificity: 1 },
  { id: 2, text: "The freer the market, the freer the people.", axis: 'economic', weight: 1, specificity: 1 },
  { id: 3, text: "Maintaining law and order is the most important function of the government.", axis: 'social', weight: 1, specificity: 1 },
  { id: 4, text: "Individual freedoms should be protected, even if they sometimes offend mainstream society.", axis: 'social', weight: -1, specificity: 1 },
  { id: 5, text: "A nation's culture and traditions should be preserved and protected.", axis: 'social', weight: 1, specificity: 1 },
  { id: 6, text: "Publicly funded healthcare for all is a fundamental right.", axis: 'economic', weight: -1, specificity: 1 },
  { id: 7, text: "Taxes should be kept as low as possible.", axis: 'economic', weight: 1, specificity: 1 },
  { id: 8, text: "Personal choices, such as what to eat or who to marry, should not be regulated by the state.", axis: 'social', weight: -1, specificity: 1 },

  // === Specificity 2: More Focused Questions ===
  { id: 9, text: "Key industries like energy and transportation should be nationalized.", axis: 'economic', weight: -1, specificity: 2, quadrant: 'AuthLeft' },
  { id: 10, text: "The government should not bail out failing private companies.", axis: 'economic', weight: 1, specificity: 2, quadrant: 'LibRight' },
  { id: 11, text: "Censorship of media is acceptable if it protects national security.", axis: 'social', weight: 1, specificity: 2, quadrant: 'AuthRight' },
  { id: 12, text: "All forms of recreational drug use should be decriminalized.", axis: 'social', weight: -1, specificity: 2, quadrant: 'LibLeft' },
  { id: 13, text: "A progressive tax system, where the wealthy pay a higher percentage, is the fairest system.", axis: 'economic', weight: -1, specificity: 2 },
  { id: 14, text: "School curricula should promote patriotic and traditional values.", axis: 'social', weight: 1, specificity: 2 },
  { id: 15, text: "The government should abolish all subsidies for businesses.", axis: 'economic', weight: 1, specificity: 2 },
  { id: 16, text: "Freedom of speech should include the right to criticize the government without fear of reprisal.", axis: 'social', weight: -1, specificity: 2 },

  // === Specificity 3: Nuanced Policy Questions ===
  { id: 17, text: "A universal basic income (UBI) is a good idea to combat poverty and automation.", axis: 'economic', weight: -1, specificity: 3, quadrant: 'LibLeft' },
  { id: 18, text: "Strong borders and strict immigration controls are essential for national sovereignty.", axis: 'social', weight: 1, specificity: 3, quadrant: 'AuthRight' },
  { id: 19, text: "Gun ownership is a fundamental right that should not be infringed upon.", axis: 'social', weight: -1, specificity: 3, quadrant: 'LibRight' },
  { id: 20, text: "The state has a right to monitor citizen communications to prevent terrorism.", axis: 'social', weight: 1, specificity: 3, quadrant: 'AuthRight' },
  { id: 21, text: "Inheritance is an illegitimate source of wealth and should be heavily taxed.", axis: 'economic', weight: -1, specificity: 3, quadrant: 'AuthLeft' },
  { id: 22, text: "All international trade agreements should prioritize domestic workers and industries.", axis: 'economic', weight: 1, specificity: 3, quadrant: 'AuthRight' },
  { id: 23, text: "Environmental regulations are a necessary check on corporate greed.", axis: 'economic', weight: -1, specificity: 3 },
  { id: 24, text: "Private property rights should be absolute and protected from government seizure.", axis: 'economic', weight: 1, specificity: 3 },

  // === Specificity 4: Ideological Questions ===
  { id: 25, text: "The concept of 'the greater good' can justify limits on individual rights.", axis: 'social', weight: 1, specificity: 4, quadrant: 'AuthLeft' },
  { id: 26, text: "Voluntary charity is more effective and moral than government welfare programs.", axis: 'economic', weight: 1, specificity: 4, quadrant: 'LibRight' },
  { id: 27, text: "Hierarchies are a natural and beneficial aspect of a functioning society.", axis: 'social', weight: 1, specificity: 4, quadrant: 'AuthRight' },
  { id: 28, text: "All forms of government are inherently coercive and should be minimized or abolished.", axis: 'social', weight: -1, specificity: 4, quadrant: 'LibLeft' },
  { id: 29, text: "From each according to his ability, to each according to his needs.", axis: 'economic', weight: -1, specificity: 4, quadrant: 'AuthLeft' },
  { id: 30, text: "Patriotism is an irrational attachment to a piece of land.", axis: 'social', weight: -1, specificity: 4, quadrant: 'LibLeft' },
  { id: 31, text: "A meritocracy, where success is based on ability, is the ideal social structure.", axis: 'economic', weight: 1, specificity: 4 },
  { id: 32, text: "International cooperation and global governance are more important than national interests.", axis: 'social', weight: -1, specificity: 4 },

  // === Specificity 5: Highly Specific/Provocative Questions ===
  { id: 33, text: "A planned economy is superior to the chaos of the free market.", axis: 'economic', weight: -1, specificity: 5, quadrant: 'AuthLeft' },
  { id: 34, text: "Taxation is theft.", axis: 'economic', weight: 1, specificity: 5, quadrant: 'LibRight' },
  { id: 35, text: "A strong, single leader is more effective than a democratic committee.", axis: 'social', weight: 1, specificity: 5, quadrant: 'AuthRight' },
  { id: 36, text: "Borders should be open, and people should be free to move between countries as they wish.", axis: 'social', weight: -1, specificity: 5, quadrant: 'LibLeft' },
  { id: 37, text: "The state should have no role in marriage, which should be a private contract.", axis: 'social', weight: -1, specificity: 5, quadrant: 'LibRight' },
  { id: 38, text: "If you have nothing to hide, you have nothing to fear from government surveillance.", axis: 'social', weight: 1, specificity: 5 },
  { id: 39, text: "The means of production should be seized and owned by the workers.", axis: 'economic', weight: -1, specificity: 5, quadrant: 'AuthLeft' },
  { id: 40, text: "The only legitimate function of the military is to defend the nation's borders from invasion.", axis: 'social', weight: -1, specificity: 5 },
  { id: 41, text: "It is morally wrong to not help a person in need, and the government should enforce this.", axis: 'economic', weight: -1, specificity: 5 },
  { id: 42, text: "Corporations are people and deserve the same legal protections.", axis: 'economic', weight: 1, specificity: 5 },
];
