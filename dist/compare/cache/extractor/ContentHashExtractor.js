"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StringHash_1 = require("../../../lib/StringHash");
const CachingExtractor_1 = __importDefault(require("./CachingExtractor"));
class ContentHashExtractor extends CachingExtractor_1.default {
    constructor(propertyExtractor) {
        super();
        this.propertyExtractor = propertyExtractor;
    }
    computeValue(node) {
        this.valueMap.set(node, this.contentHash(node));
    }
    contentHash(node) {
        let content = node.label;
        if (!node.isPropertyNode()) {
            const sortedPropertyEntries = [...this.propertyExtractor.get(node)].sort(([a, b], [c, d]) => {
                const firstComp = a.localeCompare(c);
                if (firstComp !== 0) {
                    return firstComp;
                }
                if (b == null && d == null) {
                    return 0;
                }
                else if (b == null) {
                    return -1;
                }
                else if (d == null) {
                    return 1;
                }
                else {
                    return b.localeCompare(d);
                }
            });
            for (const [key, val] of sortedPropertyEntries) {
                content += key + '=' + val;
            }
        }
        return (0, StringHash_1.stringHash)(content);
    }
}
exports.default = ContentHashExtractor;
//# sourceMappingURL=ContentHashExtractor.js.map