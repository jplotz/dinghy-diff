"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistBestMatches = void 0;
function persistBestMatches(oldNodes, newNodes, keyFunction, compareFunction, matchHandler, thresholdFunction = (cv) => true) {
    var _a;
    const candidateMap = new Map();
    for (const oldNode of oldNodes) {
        const key = keyFunction(oldNode);
        if (!candidateMap.has(key)) {
            candidateMap.set(key, []);
        }
        candidateMap.get(key).push(oldNode);
    }
    const oldToNewMap = new Map();
    newNodeLoop: for (const newNode of newNodes) {
        if (newNode.isMatched()) {
            continue;
        }
        const key = keyFunction(newNode);
        let minCV = 1;
        let minCVNode = null;
        for (const oldNode of (_a = candidateMap.get(key)) !== null && _a !== void 0 ? _a : []) {
            if (oldNode.isMatched()) {
                continue;
            }
            const CV = compareFunction(oldNode, newNode);
            if (CV === 0) {
                matchHandler(oldNode, newNode);
                oldToNewMap.delete(oldNode);
                continue newNodeLoop;
            }
            if (CV <= minCV &&
                thresholdFunction(CV) &&
                (!oldToNewMap.has(oldNode) || CV < oldToNewMap.get(oldNode).compareValue)) {
                minCV = CV;
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
        matchHandler(oldNode, bestMatch.newNode);
    }
}
exports.persistBestMatches = persistBestMatches;
//# sourceMappingURL=BestMatchPersister.js.map