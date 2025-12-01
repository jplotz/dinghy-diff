"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyMatcher = void 0;
class PropertyMatcher {
    match(oldTree, newTree, comparator) {
        const newMatchedNodes = newTree.nonPropertyNodes().filter((node) => node.isMatched());
        for (const newMatchedNode of newMatchedNodes) {
            this.matchProperties(newMatchedNode.getSingleMatch(), newMatchedNode);
        }
    }
    matchProperties(oldNode, newNode) {
        const oldLabelMap = new Map();
        for (const oldChild of oldNode) {
            if (oldChild.isPropertyNode() && !oldChild.isMatched()) {
                oldLabelMap.set(oldChild.label, oldChild);
            }
        }
        for (const newChild of newNode) {
            if (newChild.isPropertyNode() && !newChild.isMatched()) {
                if (oldLabelMap.has(newChild.label)) {
                    const match = oldLabelMap.get(newChild.label);
                    newChild.matchTo(match);
                    oldLabelMap.delete(newChild.label);
                    this.matchProperties(match, newChild);
                }
            }
        }
    }
}
exports.PropertyMatcher = PropertyMatcher;
//# sourceMappingURL=PropertyMatcher.js.map