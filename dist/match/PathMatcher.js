"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathMatcher = void 0;
class PathMatcher {
    constructor(options) {
        this.options = options;
    }
    match(oldTree, newTree, comparator) {
        let candidateMap = new Map();
        for (const [newNode, oldNode] of newTree.getSingleMatchingMap()) {
            const newPath = newNode
                .path()
                .reverse()
                .slice(1)
                .filter((node) => !node.isMatched());
            let oldPath = oldNode
                .path()
                .reverse()
                .slice(1)
                .filter((node) => !node.isMatched());
            newNodeLoop: for (const newNode of newPath) {
                for (const oldNode of oldPath) {
                    if (candidateMap.has(newNode) && candidateMap.get(newNode).has(oldNode)) {
                        const oldNodeIndex = oldPath.indexOf(oldNode);
                        oldPath = oldPath.slice(0, oldNodeIndex);
                        continue newNodeLoop;
                    }
                    if (newNode.label === oldNode.label) {
                        if (!candidateMap.has(newNode)) {
                            candidateMap.set(newNode, new Set());
                        }
                        candidateMap.get(newNode).add(oldNode);
                    }
                }
            }
        }
        candidateMap = new Map([...candidateMap.entries()].sort((entryA, entryB) => entryA[1].size - entryB[1].size));
        const oldToNewMap = new Map();
        mapLoop: for (const [newNode, oldNodeSet] of candidateMap) {
            let minCV = 1;
            let minCVNode = null;
            for (const oldNode of oldNodeSet) {
                if (oldNode.isMatched())
                    continue;
                let cv;
                if (this.options.WITH_COMMONALITY) {
                    cv = comparator.compareCommonality(oldNode, newNode);
                }
                else {
                    cv = comparator.compare(oldNode, newNode);
                }
                if (cv === 0) {
                    newNode.matchTo(oldNode);
                    oldToNewMap.delete(oldNode);
                    continue mapLoop;
                }
                if (cv <= this.options.COMPARISON_THRESHOLD &&
                    cv < minCV &&
                    (!oldToNewMap.has(oldNode) || cv < oldToNewMap.get(oldNode).compareValue)) {
                    minCV = cv;
                    minCVNode = oldNode;
                }
            }
            if (minCVNode != null) {
                oldToNewMap.set(minCVNode, {
                    newNode: newNode,
                    compareValue: minCV
                });
            }
        }
        for (const [oldNode, bestMatch] of oldToNewMap) {
            bestMatch.newNode.matchTo(oldNode);
        }
    }
}
exports.PathMatcher = PathMatcher;
//# sourceMappingURL=PathMatcher.js.map