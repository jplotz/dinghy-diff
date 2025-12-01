"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimilarityMatcher = void 0;
const BestMatchPersister_1 = require("./BestMatchPersister");
class SimilarityMatcher {
    constructor(options) {
        this.options = options;
    }
    match(oldTree, newTree, comparator) {
        const oldLeaves = oldTree.leaves().filter((leaf) => !leaf.isMatched());
        const newLeaves = newTree.leaves().filter((leaf) => !leaf.isMatched());
        const keyFunction = (node) => node.label;
        const compareFunction = (oldNode, newNode) => comparator.compare(oldNode, newNode);
        const matchFunction = (oldNode, newNode) => newNode.matchTo(oldNode);
        const thresholdFunction = (cv) => cv <= this.options.COMPARISON_THRESHOLD;
        (0, BestMatchPersister_1.persistBestMatches)(oldLeaves, newLeaves, keyFunction, compareFunction, matchFunction, thresholdFunction);
    }
}
exports.SimilarityMatcher = SimilarityMatcher;
//# sourceMappingURL=SimilarityMatcher.js.map