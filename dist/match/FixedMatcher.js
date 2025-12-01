"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedMatcher = void 0;
class FixedMatcher {
    match(oldTree, newTree, comparator) {
        if (!oldTree.isMatchedTo(newTree)) {
            newTree.matchTo(oldTree);
        }
    }
}
exports.FixedMatcher = FixedMatcher;
//# sourceMappingURL=FixedMatcher.js.map