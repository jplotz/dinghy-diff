"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchPipeline = void 0;
const FixedMatcher_1 = require("./FixedMatcher");
const HashMatcher_1 = require("./HashMatcher");
const MalformedMatchingError_1 = __importDefault(require("../error/MalformedMatchingError"));
const SimilarityMatcher_1 = require("./SimilarityMatcher");
const PathMatcher_1 = require("./PathMatcher");
const SandwichMatcher_1 = require("./SandwichMatcher");
const PropertyMatcher_1 = require("./PropertyMatcher");
const TopDownMatcher_1 = __importDefault(require("./TopDownMatcher"));
const BottomUpMatcher_1 = __importDefault(require("./BottomUpMatcher"));
class MatchPipeline {
    constructor(matchers) {
        this.matchers = matchers;
        const len = matchers.length;
        if (len === 0 || matchers[0].constructor !== FixedMatcher_1.FixedMatcher) {
            matchers.unshift(new FixedMatcher_1.FixedMatcher());
        }
    }
    static fromMode(options) {
        return new MatchPipeline([
            new FixedMatcher_1.FixedMatcher(),
            new HashMatcher_1.HashMatcher(),
            new SimilarityMatcher_1.SimilarityMatcher(options),
            new PathMatcher_1.PathMatcher(Object.assign(Object.assign({}, options), { WITH_COMMONALITY: true })),
            new TopDownMatcher_1.default(options),
            new BottomUpMatcher_1.default(options),
            new SandwichMatcher_1.SandwichMatcher(options),
            new PropertyMatcher_1.PropertyMatcher()
        ]);
    }
    static topDownOnly(options) {
        return new MatchPipeline([new FixedMatcher_1.FixedMatcher(), new TopDownMatcher_1.default(options)]);
    }
    static bottomUpOnly(options) {
        return new MatchPipeline([
            new FixedMatcher_1.FixedMatcher(),
            new HashMatcher_1.HashMatcher(),
            new SimilarityMatcher_1.SimilarityMatcher(options),
            new BottomUpMatcher_1.default(options)
        ]);
    }
    static onlySimpleMatchers(options) {
        return new MatchPipeline([
            new FixedMatcher_1.FixedMatcher(),
            new HashMatcher_1.HashMatcher(),
            new TopDownMatcher_1.default(options),
            new SimilarityMatcher_1.SimilarityMatcher(options),
            new BottomUpMatcher_1.default(options)
        ]);
    }
    execute(oldTree, newTree, comparator) {
        for (const matcher of this.matchers) {
            matcher.match(oldTree, newTree, comparator);
            if (!this.verifyMatching(oldTree, newTree)) {
                console.log(oldTree);
                throw new MalformedMatchingError_1.default(`${matcher.constructor.name} produced invalid matching`);
            }
        }
    }
    verifyMatching(oldTree, newTree) {
        const oldNodeSet = new Set(oldTree.toPreOrderUnique());
        const newNodeSet = new Set(newTree.toPreOrderUnique());
        for (const oldNode of oldNodeSet) {
            if (!oldNode.verifySingleMatching())
                return false;
            if (oldNode.isMatched()) {
                if (!newNodeSet.has(oldNode.getSingleMatch()))
                    return false;
            }
        }
        for (const newNode of newNodeSet) {
            if (!newNode.verifySingleMatching())
                return false;
            if (newNode.isMatched()) {
                if (!oldNodeSet.has(newNode.getSingleMatch()))
                    return false;
            }
        }
        return true;
    }
}
exports.MatchPipeline = MatchPipeline;
//# sourceMappingURL=MatchPipeline.js.map