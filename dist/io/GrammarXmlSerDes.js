"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Grammar_1 = __importDefault(require("../grammar/Grammar"));
const SerDes_1 = __importDefault(require("./SerDes"));
const UnimplementedError_1 = __importDefault(require("../error/UnimplementedError"));
const xmldom_1 = __importDefault(require("@xmldom/xmldom"));
const GrammarNode_1 = __importDefault(require("../grammar/GrammarNode"));
const ComparisonType_1 = __importDefault(require("../grammar/ComparisonType"));
const WeightedCV_1 = __importDefault(require("../grammar/WeightedCV"));
const NodeType_1 = __importDefault(require("../grammar/NodeType"));
const Util_1 = require("../Util");
const MalformedGrammarError_1 = __importDefault(require("../error/MalformedGrammarError"));
class GrammarXmlSerDes extends SerDes_1.default {
    constructor(options) {
        super();
        this.options = options;
    }
    buildString(obj) {
        throw new UnimplementedError_1.default();
    }
    parseFromString(xml, includeChildren = true) {
        const root = (Util_1.RUNNING_IN_BROWSER ? new DOMParser() : new xmldom_1.default.DOMParser())
            .parseFromString(xml, 'text/xml')
            .childNodes.item(0);
        let inners = [];
        let leaves = [];
        for (const element of (0, Util_1.getElementChildren)(root)) {
            switch (element.localName) {
                case 'inners':
                    inners = this.parseGrammarNodes(element, NodeType_1.default.INNER);
                    break;
                case 'leaves':
                    leaves = this.parseGrammarNodes(element, NodeType_1.default.LEAF);
                    break;
                default:
                    throw new MalformedGrammarError_1.default();
            }
        }
        return new Grammar_1.default(inners, leaves);
    }
    parseGrammarNodes(xmlDom, nodeType) {
        var _a;
        const grammarNodes = [];
        for (const grammarNodeElement of (0, Util_1.getElementChildren)(xmlDom)) {
            const weightedCvs = [];
            const ordered = grammarNodeElement.hasAttribute('ordered')
                ? grammarNodeElement.getAttribute('ordered') == 'true'
                : undefined;
            for (const weightedCvElement of (0, Util_1.getElementChildren)(grammarNodeElement)) {
                let weight;
                if (weightedCvElement.getAttribute('weight') != null) {
                    let parsed = parseFloat(weightedCvElement.getAttribute('weight'));
                    weight = isNaN(parsed) ? undefined : parsed;
                }
                const hasComparisonType = weightedCvElement.hasAttribute('comparisonType');
                const comparisonType = ComparisonType_1.default[(hasComparisonType
                    ? weightedCvElement.getAttribute('comparisonType')
                    : 'EQ')];
                const path = (_a = (0, Util_1.getTextContentWithoutChildren)(weightedCvElement)) !== null && _a !== void 0 ? _a : '';
                weightedCvs.push(new WeightedCV_1.default(path, weight, comparisonType));
            }
            grammarNodes.push(new GrammarNode_1.default(nodeType, grammarNodeElement.localName, weightedCvs, ordered));
        }
        return grammarNodes;
    }
}
exports.default = GrammarXmlSerDes;
//# sourceMappingURL=GrammarXmlSerDes.js.map