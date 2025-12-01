"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GrammarNode {
    constructor(type, label, weightedCVs, ordered = true) {
        this.type = type;
        this.label = label;
        this.weightedCVs = weightedCVs;
        this.ordered = ordered;
    }
}
exports.default = GrammarNode;
//# sourceMappingURL=GrammarNode.js.map