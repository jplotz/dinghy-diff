"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CachingExtractor_1 = __importDefault(require("./CachingExtractor"));
const Util_1 = require("../../../Util");
class SizeExtractor extends CachingExtractor_1.default {
    computeValue(node) {
        this.valueMap.set(node, 1 + node.children.map((child) => this.get(child)).reduce(Util_1.arraySum, 0));
    }
}
exports.default = SizeExtractor;
//# sourceMappingURL=SizeExtractor.js.map