import GrammarNode from './GrammarNode';
export default class Grammar {
    readonly inners: GrammarNode[];
    readonly leaves: GrammarNode[];
    private labelMap;
    constructor(inners: GrammarNode[], leaves: GrammarNode[]);
    getGrammarNodeByLabel(label: string): GrammarNode | undefined;
}
