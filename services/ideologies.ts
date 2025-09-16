import type { Ideology } from '../types';

interface IdeologyData extends Ideology {
    scores: {
        econ: { min: number; max: number };
        soc: { min: number; max: number };
    };
}

export const IDEOLOGIES: IdeologyData[] = [
    // Authoritarian Left
    {
        name: "State Socialism",
        description: "Advocates for state or public ownership and control of the means of production and distribution. Prioritizes social welfare and economic equality, often through a centralized government that may limit individual civil liberties in pursuit of collective goals.",
        country: {
            name: "USSR (Historical)",
            reasoning: "The Soviet Union operated under a single-party, state-controlled economy where major industries were nationalized, fitting the principles of State Socialism.",
            svgFlag: `<svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg"><path fill="#c00" d="m0 0h1000v500h-1000z"/><path fill="#ff0" d="m204 100-47 34-47-34-18 55 58 12-22 54 58-12 58 12-22-54 58-12-18-55-47 34z"/><path fill="#ff0" d="m195 200h-110l89-68-108 24 68-89-68 89 108 24-89 68z"/></svg>`
        },
        usPartyAlignment: {
            party: "Democrat",
            reasoning: "Aligns with the Democratic party's support for social safety nets, regulation, and public services, though takes these ideas much further.",
            disagreements: "Would strongly disagree with the Democratic party's support for market-based capitalism, private enterprise, and individualistic civil liberties."
        },
        scores: { econ: { min: -100, max: -50 }, soc: { min: 50, max: 100 } }
    },
    // Authoritarian Right
    {
        name: "National Conservatism",
        description: "A form of conservatism that concentrates on upholding national and cultural identity. It is skeptical of immigration and multiculturalism, and supports a strong state to enforce law, order, and traditional values, often combined with protectionist economic policies.",
        country: {
            name: "Hungary",
            reasoning: "Modern Hungary's government emphasizes national sovereignty, traditional Christian values, and has implemented strong border controls, reflecting National Conservative ideals.",
            svgFlag: `<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><path fill="#c00" d="m0 0h900v200h-900z"/><path fill="#fff" d="m0 200h900v200h-900z"/><path fill="#008000" d="m0 400h900v200h-900z"/></svg>`
        },
        usPartyAlignment: {
            party: "Republican",
            reasoning: "Shares the Republican party's focus on patriotism, traditional values, and strong border security.",
            disagreements: "May disagree with the Republican establishment's support for free trade and interventionist foreign policy, preferring a more nationalist and protectionist stance."
        },
        scores: { econ: { min: 25, max: 75 }, soc: { min: 50, max: 100 } }
    },
    // Libertarian Left
    {
        name: "Social Democracy",
        description: "Supports economic and social interventions to promote social justice within a capitalist framework. It involves a commitment to representative democracy, income redistribution, and a welfare state providing universal social services like healthcare and education.",
        country: {
            name: "Sweden",
            reasoning: "Sweden has a strong welfare state, high taxes, and robust public services, combined with a commitment to democracy and a market economy, epitomizing Social Democracy.",
            svgFlag: `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><path fill="#006aa7" d="m0 0h160v100h-160z"/><path fill="#fecc00" d="m50 0h30v100h-30z"/><path fill="#fecc00" d="m0 40h160v20h-160z"/></svg>`
        },
        usPartyAlignment: {
            party: "Democrat",
            reasoning: "Strongly aligns with the progressive wing of the Democratic party on issues like universal healthcare, social safety nets, and wealth redistribution.",
            disagreements: "Would likely find the mainstream Democratic party as not going far enough in regulating capitalism and providing universal social benefits."
        },
        scores: { econ: { min: -75, max: -25 }, soc: { min: -50, max: 0 } }
    },
     // Libertarian Right
    {
        name: "Libertarianism",
        description: "An ideology that seeks to maximize individual autonomy and political freedom, emphasizing free association, freedom of choice, individualism, and voluntary association. Libertarians advocate for a drastically minimized state, or in some cases, no state at all.",
        country: {
            name: "Switzerland",
            reasoning: "While not purely libertarian, Switzerland's emphasis on individual responsibility, gun rights, low taxes, and decentralized governance through cantons reflects strong libertarian principles.",
            svgFlag: `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path fill="#d52b1e" d="m0 0h500v500h-500z"/><g fill="#fff"><path d="m100 200h300v100h-300z"/><path d="m200 100h100v300h-100z"/></g></svg>`
        },
        usPartyAlignment: {
            party: "Republican",
            reasoning: "Aligns with the Republican party's advocacy for lower taxes, less government regulation, and gun rights.",
            disagreements: "Would strongly disagree with Republican stances on social issues (e.g., drug prohibition, marriage), military interventionism, and government surveillance."
        },
        scores: { econ: { min: 50, max: 100 }, soc: { min: -100, max: -50 } }
    },
    // Center
    {
        name: "Centrism",
        description: "Represents a balanced political viewpoint, opposing radical changes in favor of gradual reform. Centrists typically blend ideas from both the left and right, supporting a market economy with a degree of social welfare and regulation, alongside a respect for individual rights and social order.",
        country: {
            name: "Canada",
            reasoning: "Canada's political system balances a market economy with a strong social safety net (like universal healthcare), and its culture often seeks compromise, reflecting a centrist approach.",
            svgFlag: `<svg viewBox="-41 0 582 512" xmlns="http://www.w3.org/2000/svg"><path fill="#d52b1e" d="m0 0h500v512h-500z"/><path fill="#fff" d="m125 0h250v512h-250z"/><path fill="#d52b1e" d="m250 101-31 23-38-16-11 41-43-3-9 41-43-15-21 37 32 25-32 25-21 37 43-15 9 41-43-3 11 41 38-16 31 23v-252z"/></svg>`
        },
        usPartyAlignment: {
            party: "Independent",
            reasoning: "Takes a pragmatic approach, agreeing with Democrats on some issues (like social safety nets) and Republicans on others (like fiscal responsibility), without strictly adhering to either party's platform.",
            disagreements: "Finds both parties to be too ideologically extreme, preferring compromise and evidence-based policy over partisan loyalty."
        },
        scores: { econ: { min: -25, max: 25 }, soc: { min: -25, max: 25 } }
    },
];

export const DEFAULT_IDEOLOGY: Ideology = {
    name: "Centrism",
    description: "Represents a balanced political viewpoint, opposing radical changes in favor of gradual reform. Centrists typically blend ideas from both the left and right, supporting a market economy with a degree of social welfare and regulation, alongside a respect for individual rights and social order.",
    country: {
        name: "Canada",
        reasoning: "Canada's political system balances a market economy with a strong social safety net (like universal healthcare), and its culture often seeks compromise, reflecting a centrist approach.",
        svgFlag: `<svg viewBox="-41 0 582 512" xmlns="http://www.w3.org/2000/svg"><path fill="#d52b1e" d="m0 0h500v512h-500z"/><path fill="#fff" d="m125 0h250v512h-250z"/><path fill="#d52b1e" d="m250 101-31 23-38-16-11 41-43-3-9 41-43-15-21 37 32 25-32 25-21 37 43-15 9 41-43-3 11 41 38-16 31 23v-252z"/></svg>`
    },
    usPartyAlignment: {
        party: "Independent",
        reasoning: "Takes a pragmatic approach, agreeing with Democrats on some issues (like social safety nets) and Republicans on others (like fiscal responsibility), without strictly adhering to either party's platform.",
        disagreements: "Finds both parties to be too ideologically extreme, preferring compromise and evidence-based policy over partisan loyalty."
    }
};
