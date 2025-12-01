"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comparator = void 0;
const Cache_1 = __importDefault(require("./cache/Cache"));
const ComparisonType_1 = __importDefault(require("../grammar/ComparisonType"));
const LcsLib_1 = __importDefault(require("../lib/LcsLib"));
const UnimplementedError_1 = __importDefault(require("../error/UnimplementedError"));
class Comparator extends Cache_1.default {
    constructor(options) {
        super();
        this.options = options;
        this.lcsLib = new LcsLib_1.default(this.options);
    }
    compareCommonality(nodeA, nodeB) {
        let common = 0;
        const setA = new Set(nodeB.leaves());
        const setB = new Set(nodeA.leaves());
        for (const cand of setA) {
            if (cand.isMatched() && setB.has(cand.getSingleMatch())) {
                common++;
            }
        }
        const commonalityCv = 1 - (2 * common) / (setA.size + setB.size);
        return this.weightedAverage([this.compareContent(nodeA, nodeB), this.comparePosition(nodeA, nodeB), commonalityCv], [this.options.CONTENT_WEIGHT, this.options.POSITION_WEIGHT, this.options.COMMONALITY_WEIGHT]);
    }
    compare(nodeA, nodeB) {
        const compareValue = this.weightedAverage([this.compareContent(nodeA, nodeB), this.comparePosition(nodeA, nodeB)], [this.options.CONTENT_WEIGHT, this.options.POSITION_WEIGHT]);
        return compareValue !== null && compareValue !== void 0 ? compareValue : 0;
    }
    compareContent(nodeA, nodeB) {
        if (nodeA.label !== nodeB.label || nodeA.grammarNode == null || nodeB.grammarNode == null) {
            return 1.0;
        }
        console.assert(nodeB.grammarNode === nodeA.grammarNode);
        const grammarNode = nodeA.grammarNode;
        const items = [0];
        const weights = [this.options.BASE_WEIGHT];
        const propertiesA = this.getProperties(nodeA);
        const propertiesB = this.getProperties(nodeB);
        for (const wcv of grammarNode.weightedCVs) {
            const valueA = propertiesA.get(wcv.path);
            const valueB = propertiesB.get(wcv.path);
            if (valueA == null && valueB == null) {
                continue;
            }
            let cv = 1;
            if (!((valueA == null && valueB) || (valueA && valueB == null))) {
                switch (wcv.comparisonType) {
                    case ComparisonType_1.default.EQ:
                        cv = valueA === valueB ? 0 : 1;
                        break;
                    case ComparisonType_1.default.LCS:
                        cv = this.compareLcs([...valueA], [...valueB]);
                        break;
                    case ComparisonType_1.default.GATE:
                        if (valueA !== valueB) {
                            return 1.0;
                        }
                        break;
                    case ComparisonType_1.default.NUMERIC:
                        if (valueA == null || valueB == null) {
                            cv = 0;
                            break;
                        }
                        const large = Math.max(parseInt(valueA), parseInt(valueB));
                        const small = Math.min(parseInt(valueA), parseInt(valueB));
                        if (small === 0) {
                            return 0;
                        }
                        if (large === 0) {
                            cv = 0;
                        }
                        else {
                            cv = 1 - small / large;
                        }
                        break;
                    default:
                        throw new UnimplementedError_1.default();
                }
            }
            items.push(cv);
            weights.push(wcv.weight);
        }
        return this.weightedAverage(items, weights, 0);
    }
    comparePosition(nodeA, nodeB) {
        const radius = this.options.PATH_COMPARE_RANGE;
        const slices = [nodeA, nodeB].map((node) => node
            .path(radius + 1)
            .reverse()
            .slice(1)
            .map((n) => {
            var _a;
            return (this.options.USE_CONTENT_HASH_FOR_PATH_COMPARISON ? this.getContentHash(n) : n.label) +
                (!n.isRoot() && ((_a = n.grammarNode) === null || _a === void 0 ? void 0 : _a.ordered) ? n.getIndex().toString() : '');
        }));
        return this.comparePathLcs(slices[0], slices[1]);
    }
    compareSize(nodeA, nodeB) {
        return this.getSize(nodeA) - this.getSize(nodeB);
    }
    weightedAverage(items, weights, defaultValue = 0) {
        let itemSum = 0;
        let weightSum = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i] != null) {
                const adjustedWeight = (items[i] === 0 ? this.options.WEIGHT_BOOST_MULTIPLIER : 1) * weights[i];
                itemSum += items[i] * adjustedWeight;
                weightSum += adjustedWeight;
            }
        }
        if (weightSum === 0)
            return defaultValue;
        return itemSum / weightSum;
    }
    compareLcs(seqA, seqB, defaultValue = null) {
        if (seqA == null) {
            seqA = [];
        }
        else if (seqB == null) {
            seqB = [];
        }
        const maxLength = Math.max(seqA.length, seqB.length);
        if (maxLength === 0)
            return defaultValue;
        return 1 - this.lcsLib.getLcsLength(seqA, seqB) / maxLength;
    }
    comparePathLcs(pathA, pathB) {
        const maxLength = Math.max(pathA.length, pathB.length);
        if (maxLength === 0)
            return 0;
        return 1 - this.lcsLib.getLcsLengthFast(pathA, pathB) / maxLength;
    }
}
exports.Comparator = Comparator;
//# sourceMappingURL=Comparator.js.map