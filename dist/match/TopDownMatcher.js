"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
class TopDownMatcher {
    constructor(options) {
        this.options = options;
    }
    match(oldTree, newTree, comparator) {
        const matchRecursive = (oldNode, newNode) => {
            if (!oldNode.isMatched() &&
                !newNode.isMatched() &&
                comparator.compareContent(oldNode, newNode) < this.options.COMPARISON_THRESHOLD) {
                oldNode.matchTo(newNode);
            }
            if (oldNode.isMatchedTo(newNode)) {
                for (let i = 0; i < [oldNode.children.length, newNode.children.length].reduce(Util_1.arrayMin); i++) {
                    matchRecursive(oldNode.childAt(i), newNode.childAt(i));
                }
            }
        };
        oldTree
            .toPreOrderUnique()
            .filter((n) => n.isMatched())
            .forEach((n) => matchRecursive(n, n.getSingleMatch()));
    }
}
exports.default = TopDownMatcher;
//# sourceMappingURL=TopDownMatcher.js.map