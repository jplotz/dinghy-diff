"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SerDes_1 = __importDefault(require("./SerDes"));
const xmldom_1 = __importDefault(require("@xmldom/xmldom"));
const vkbeautify_1 = __importDefault(require("vkbeautify"));
const Util_1 = require("../Util");
const TNodeBuilder_1 = __importDefault(require("../tree/TNodeBuilder"));
class TNodeXMLSerDes extends SerDes_1.default {
    constructor(grammar, options) {
        super();
        this.grammar = grammar;
        this.options = options;
    }
    buildString(node) {
        const ownerDocument = (Util_1.RUNNING_IN_BROWSER ? new DOMImplementation() : new xmldom_1.default.DOMImplementation()).createDocument(null, null);
        const xmlString = (Util_1.RUNNING_IN_BROWSER ? new XMLSerializer() : new xmldom_1.default.XMLSerializer()).serializeToString(this.buildXmlDom(ownerDocument, node));
        if (this.options.PRETTY_XML) {
            return vkbeautify_1.default.xml(xmlString);
        }
        return xmlString;
    }
    buildXmlDom(ownerDocument, node) {
        const xmlElement = ownerDocument.createElement(node.label);
        if (node.isRoot()) {
        }
        for (const [key, value] of node.attributes) {
            xmlElement.setAttribute(key, value);
        }
        for (const child of node) {
            xmlElement.appendChild(this.buildXmlDom(ownerDocument, child));
        }
        if (node.text != null) {
            xmlElement.appendChild(ownerDocument.createTextNode(node.text));
        }
        return xmlElement;
    }
    parseXmlDom(xmlElement, includeChildren = true) {
        const tagName = xmlElement.localName;
        const attributes = new Map();
        for (let i = 0; i < xmlElement.attributes.length; i++) {
            const attrNode = xmlElement.attributes.item(i);
            attributes.set(attrNode.name, attrNode.value);
        }
        const children = [];
        for (const childElement of (0, Util_1.getElementChildren)(xmlElement)) {
            children.push(this.parseXmlDom(childElement, includeChildren));
        }
        const text = (0, Util_1.getTextContentWithoutChildren)(xmlElement);
        const grammarNode = this.grammar.getGrammarNodeByLabel(tagName);
        const builder = new TNodeBuilder_1.default()
            .data(this.getData(tagName, text, attributes))
            .children(children);
        if (grammarNode) {
            builder.grammarNode(grammarNode);
        }
        return builder.build();
    }
    parseFromString(xml, includeChildren = true) {
        const root = (Util_1.RUNNING_IN_BROWSER ? new DOMParser() : new xmldom_1.default.DOMParser())
            .parseFromString(xml, 'text/xml')
            .childNodes.item(0);
        return this.parseXmlDom(root);
    }
}
exports.default = TNodeXMLSerDes;
//# sourceMappingURL=TNodeXMLSerDes.js.map