"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BottomUpMatcher {
    constructor(options) {
        this.options = options;
    }
    match(oldTree, newTree, comparator) {
        let moreMatches = oldTree.toPreOrderUnique().filter((n) => n.isMatched() && !n.isRoot());
        while (moreMatches.length > 0) {
            const next = [];
            for (const node of moreMatches) {
                const cand = node.getParent();
                const candMatch = node.getSingleMatch().getParent();
                if (candMatch.attributes.get('operator_id') === 10) {
                    console.log(candMatch.label, cand);
                }
                if (!cand.isMatched() &&
                    !candMatch.isMatched() &&
                    comparator.compareContent(cand, candMatch) < this.options.COMPARISON_THRESHOLD) {
                    if (cand.children.length !== candMatch.children.length) {
                        continue;
                    }
                    let allMatching = true;
                    for (let i = 0; i < cand.children.length; i++) {
                        if (!cand.childAt(i).isMatched() ||
                            !candMatch.children.some((c) => c.isMatchedTo(cand.childAt(i)))) {
                            allMatching = false;
                            break;
                        }
                    }
                    if (allMatching) {
                        cand.matchTo(candMatch);
                        next.push(cand);
                    }
                }
            }
            moreMatches = next;
        }
    }
}
exports.default = BottomUpMatcher;
//# sourceMappingURL=BottomUpMatcher.js.map