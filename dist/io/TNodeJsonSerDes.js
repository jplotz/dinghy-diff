"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vkbeautify_1 = __importDefault(require("vkbeautify"));
const SerDes_1 = __importDefault(require("./SerDes"));
const TNodeBuilder_1 = __importDefault(require("../tree/TNodeBuilder"));
class TNodeJsonSerDes extends SerDes_1.default {
    constructor(grammar, options) {
        super();
        this.grammar = grammar;
        this.options = options;
    }
    buildString(node) {
        const jsonString = JSON.stringify(node);
        if (this.options.PRETTY_XML) {
            return vkbeautify_1.default.json(jsonString);
        }
        return jsonString;
    }
    transformParsedJsonObj(parsedJsonObj, includeChildren = true) {
        const attributes = new Map();
        const children = [];
        const label = parsedJsonObj[this.options.JX_TYPE_KEY];
        const text = parsedJsonObj[this.options.JX_VALUE_KEY];
        for (const [key, val] of Object.entries(parsedJsonObj)) {
            if (key === this.options.JX_ATTRS_KEY) {
                for (const [attrKey, attrVal] of Object.entries(val)) {
                    attributes.set(attrKey, attrVal);
                }
            }
            else if (key === this.options.JX_CHILDREN_KEY && includeChildren) {
                for (const childObj of val) {
                    const child = this.transformParsedJsonObj(childObj, includeChildren);
                    children.push(child);
                }
            }
        }
        const grammarNode = this.grammar.getGrammarNodeByLabel(label);
        const builder = new TNodeBuilder_1.default()
            .data(this.getData(label, text, attributes))
            .children(children);
        if (grammarNode) {
            builder.grammarNode(grammarNode);
        }
        return builder.build();
    }
    parseFromString(jsonString, includeChildren = true) {
        const parsedJsonObj = JSON.parse(jsonString);
        return this.transformParsedJsonObj(parsedJsonObj, true);
    }
}
exports.default = TNodeJsonSerDes;
//# sourceMappingURL=TNodeJsonSerDes.js.map