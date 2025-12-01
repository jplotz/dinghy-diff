"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CachingExtractor {
    constructor() {
        this.valueMap = new Map();
    }
    get(node) {
        if (!this.valueMap.has(node)) {
            this.computeValue(node);
        }
        return this.valueMap.get(node);
    }
}
exports.default = CachingExtractor;
//# sourceMappingURL=CachingExtractor.js.map