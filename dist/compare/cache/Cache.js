"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SizeExtractor_1 = __importDefault(require("./extractor/SizeExtractor"));
const TreeHashExtractor_1 = __importDefault(require("./extractor/TreeHashExtractor"));
const ContentHashExtractor_1 = __importDefault(require("./extractor/ContentHashExtractor"));
const PropertyExtractor_1 = __importDefault(require("./extractor/PropertyExtractor"));
class Cache {
    constructor() {
        this.propertyExtractor = new PropertyExtractor_1.default();
        this.contentHashExtractor = new ContentHashExtractor_1.default(this.propertyExtractor);
        this.hashExtractor = new TreeHashExtractor_1.default(this.contentHashExtractor);
        this.sizeExtractor = new SizeExtractor_1.default();
    }
    getHash(node) {
        return this.hashExtractor.get(node);
    }
    getContentHash(node) {
        return this.contentHashExtractor.get(node);
    }
    getSize(node) {
        return this.sizeExtractor.get(node);
    }
    getProperties(node) {
        return this.propertyExtractor.get(node);
    }
}
exports.default = Cache;
//# sourceMappingURL=Cache.js.map