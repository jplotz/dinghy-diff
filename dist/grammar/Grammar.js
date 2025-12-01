"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Grammar {
    constructor(inners, leaves) {
        this.inners = inners;
        this.leaves = leaves;
        this.labelMap = new Map();
        for (const grammarNode of inners.concat(leaves)) {
            this.labelMap.set(grammarNode.label, grammarNode);
        }
    }
    getGrammarNodeByLabel(label) {
        return this.labelMap.get(label);
    }
}
exports.default = Grammar;
//# sourceMappingURL=Grammar.js.map