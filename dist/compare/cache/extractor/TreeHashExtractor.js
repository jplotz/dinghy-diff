"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CachingExtractor_1 = __importDefault(require("./CachingExtractor"));
const PrimeGenerator_1 = require("../../../lib/PrimeGenerator");
class TreeHashExtractor extends CachingExtractor_1.default {
    constructor(contentHashExtractor) {
        super();
        this.contentHashExtractor = contentHashExtractor;
    }
    computeValue(node) {
        this.valueMap.set(node, this.contentHashExtractor.get(node) + this.childHash(node));
    }
    childHash(node) {
        let childHash;
        if (node.hasInternalOrdering()) {
            const primes = (0, PrimeGenerator_1.getPrimes)(node.degree());
            childHash = node.children
                .map((child, i) => this.get(child) * primes[i])
                .reduce((prev, curr) => prev + curr, 0);
        }
        else {
            childHash = node.children
                .map((child) => this.get(child))
                .reduce((prev, curr) => prev + curr, 0);
        }
        return childHash;
    }
}
exports.default = TreeHashExtractor;
//# sourceMappingURL=TreeHashExtractor.js.map