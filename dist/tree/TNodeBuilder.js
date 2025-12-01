"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TNode_1 = __importDefault(require("./TNode"));
class TNodeBuilder {
    constructor() {
        this._children = [];
    }
    children(children) {
        this._children = children;
        return this;
    }
    data(data) {
        this._data = data;
        return this;
    }
    grammarNode(grammarNode) {
        this._grammarNode = grammarNode;
        return this;
    }
    build() {
        if (!this._data) {
            throw new Error('Missing state');
        }
        const node = new TNode_1.default(this._data, this._grammarNode);
        for (const child of this._children) {
            node.appendChild(child);
        }
        return node;
    }
}
exports.default = TNodeBuilder;
//# sourceMappingURL=TNodeBuilder.js.map