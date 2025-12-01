"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SerDes_1 = __importDefault(require("./SerDes"));
const TNodeBuilder_1 = __importDefault(require("../tree/TNodeBuilder"));
const dinghy_1 = require("@tdurieux/dinghy");
const GrammarNode_1 = __importDefault(require("../grammar/GrammarNode"));
const NodeType_1 = __importDefault(require("../grammar/NodeType"));
class TNodeDinghyLSerDes extends SerDes_1.default {
    constructor() {
        super();
    }
    buildString(node) {
        const jsonString = JSON.stringify(node);
        return jsonString;
    }
    parseAST(ast, includeChildren = true) {
        const type = ast.type;
        const children = [];
        for (const childElement of ast.children) {
            if (childElement == null)
                continue;
            children.push(this.parseAST(childElement, includeChildren));
        }
        const text = ast.value ? ast.value : ast.type;
        const nodeType = ast.value ? NodeType_1.default.LEAF : NodeType_1.default.INNER;
        const builder = new TNodeBuilder_1.default()
            .grammarNode(new GrammarNode_1.default(nodeType, type, []))
            .data(this.getData(type, text, ast))
            .children(children);
        return builder.build();
    }
    parseFromString(code, includeChildren = true) {
        let root;
        if (code.includes('FROM')) {
            root = dinghy_1.dockerfileParser.parseDocker(code);
        }
        else {
            root = dinghy_1.shellParser.parseShell(code);
        }
        return this.parseAST(root, includeChildren);
    }
}
exports.default = TNodeDinghyLSerDes;
//# sourceMappingURL=TNodeDinghyLSerDes.js.map