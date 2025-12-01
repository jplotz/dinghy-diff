"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMatcher = void 0;
const BestMatchPersister_1 = require("./BestMatchPersister");
class HashMatcher {
    match(oldTree, newTree, comparator) {
        const oldNodes = oldTree.nonPropertyNodes().filter((node) => !node.isMatched());
        const newNodes = newTree
            .nonPropertyNodes()
            .filter((node) => !node.isMatched())
            .sort((a, b) => comparator.compareSize(b, a));
        const keyFunction = (node) => comparator.getHash(node);
        const compareFunction = (oldNode, newNode) => comparator.comparePosition(oldNode, newNode);
        const matchFunction = (oldRoot, newRoot) => {
            const newPreOrder = newRoot.toPreOrderUnique();
            const oldPreOrder = oldRoot.toPreOrderUnique();
            const stableSortByHash = (a, b) => comparator.getHash(a) - comparator.getHash(b);
            newPreOrder.sort(stableSortByHash);
            oldPreOrder.sort(stableSortByHash);
            for (let i = 0; i < newPreOrder.length; i++) {
                if (!newPreOrder[i].isMatched() && !oldPreOrder[i].isMatched()) {
                    newPreOrder[i].matchTo(oldPreOrder[i]);
                }
            }
        };
        const threshOldFunction = (cv) => true;
        (0, BestMatchPersister_1.persistBestMatches)(oldNodes, newNodes, keyFunction, compareFunction, matchFunction, threshOldFunction);
    }
}
exports.HashMatcher = HashMatcher;
//# sourceMappingURL=HashMatcher.js.map