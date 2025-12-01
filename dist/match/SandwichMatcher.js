"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandwichMatcher = void 0;
class SandwichMatcher {
    constructor(options) {
        this.options = options;
    }
    match(oldTree, newTree, comparator) {
        const newNodes = newTree.nonPropertyNodes().filter((node) => !node.isMatched());
        for (const newNode of newNodes) {
            const parentMatch = newNode.getParent().isMatched()
                ? newNode.getParent().getSingleMatch()
                : null;
            let minCV = 1;
            let minCVNode = null;
            newNode.children.forEach((node) => {
                if (node.isMatched()) {
                    const match = node.getSingleMatch();
                    if (match.getParent().label === newNode.label &&
                        !match.getParent().isMatched() &&
                        match.getParent().getParent() === parentMatch) {
                        const CV = comparator.compareContent(newNode, match.getParent());
                        if (CV < minCV) {
                            minCVNode = match.getParent();
                            minCV = CV;
                        }
                    }
                }
            });
            if (minCVNode != null && minCV <= this.options.COMPARISON_THRESHOLD) {
                newNode.matchTo(minCVNode);
                continue;
            }
            const leftSibling = newNode.getLeftSibling();
            const rightSibling = newNode.getRightSibling();
            if ((leftSibling != null && !leftSibling.isMatched()) ||
                (rightSibling != null && !rightSibling.isMatched())) {
                continue;
            }
            const rightSiblingMatch = rightSibling === null || rightSibling === void 0 ? void 0 : rightSibling.getSingleMatch();
            const leftSiblingMatch = leftSibling === null || leftSibling === void 0 ? void 0 : leftSibling.getSingleMatch();
            let potentialMatch;
            if (leftSibling != null && rightSibling != null) {
                if (rightSiblingMatch.getLeftSibling() == null ||
                    rightSiblingMatch.getLeftSibling() !== leftSiblingMatch.getRightSibling()) {
                    continue;
                }
                potentialMatch = rightSiblingMatch.getLeftSibling();
            }
            else if (rightSibling == null && leftSibling != null) {
                if (leftSiblingMatch.getRightSibling() == null) {
                    continue;
                }
                potentialMatch = leftSiblingMatch.getRightSibling();
                if (potentialMatch.getRightSibling() != null) {
                    continue;
                }
            }
            else if (rightSibling != null && leftSibling == null) {
                if (rightSiblingMatch.getLeftSibling() == null) {
                    continue;
                }
                potentialMatch = rightSiblingMatch.getLeftSibling();
                if (potentialMatch.getLeftSibling() != null) {
                    continue;
                }
            }
            else if (newNode.getParent().isMatched()) {
                const parentMatch = newNode.getParent().getSingleMatch();
                if (parentMatch.degree() === 1) {
                    potentialMatch = parentMatch.childAt(0);
                }
                else {
                    continue;
                }
            }
            else {
                continue;
            }
            potentialMatch = potentialMatch;
            if (comparator.compareContent(potentialMatch, newNode) <= this.options.COMPARISON_THRESHOLD &&
                !potentialMatch.isMatched()) {
                newNode.matchTo(potentialMatch);
            }
        }
    }
}
exports.SandwichMatcher = SandwichMatcher;
//# sourceMappingURL=SandwichMatcher.js.map