"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CachingExtractor_1 = __importDefault(require("./CachingExtractor"));
class PropertyExtractor extends CachingExtractor_1.default {
    computeValue(node) {
        if (node.isPropertyNode())
            return;
        const grammarNode = node.grammarNode;
        const propertyMap = new Map();
        for (const wcv of grammarNode.weightedCVs) {
            propertyMap.set(wcv.path, this.accessProperty(node, wcv.path));
        }
        this.valueMap.set(node, propertyMap);
    }
    accessProperty(node, path) {
        const pathNodes = path.split('/');
        let curr = node;
        for (const pathNode of pathNodes) {
            if (pathNode === 'text()' || pathNode === '') {
                return curr.text;
            }
            if (pathNode.startsWith('@')) {
                const attributeName = pathNode.replace('@', '');
                return curr.attributes.get(attributeName);
            }
            curr = curr.children.find((child) => child.label === pathNode);
            if (!curr) {
                return null;
            }
        }
        return curr.text;
    }
}
exports.default = PropertyExtractor;
//# sourceMappingURL=PropertyExtractor.js.map