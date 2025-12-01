"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeType_1 = __importDefault(require("../grammar/NodeType"));
const Origin_1 = __importDefault(require("./Origin"));
class TNode {
    constructor(data, grammarNode) {
        this.data = data;
        this.grammarNode = grammarNode;
        this._matches = [];
        this._origin = new Origin_1.default(-1, -1, '');
        this._children = [];
        this._parent = null;
        this._index = null;
    }
    get label() {
        return this.data.label;
    }
    get text() {
        return this.data.text;
    }
    set text(text) {
        this.data.text = text;
    }
    get attributes() {
        return this.data.attributes;
    }
    appendChild(child) {
        child._parent = this;
        child._index = this._children.length;
        this._children.push(child);
    }
    get children() {
        return this._children;
    }
    get matches() {
        return this._matches;
    }
    get origin() {
        return this._origin;
    }
    set origin(origin) {
        this._origin = origin;
    }
    get sourceIndex() {
        return this.origin.sourceIndex;
    }
    copy(includeChildren = true) {
        const dataCopy = this.data.copy();
        const copy = new TNode(dataCopy, this.grammarNode);
        if (includeChildren) {
            this._children.forEach((child) => copy.appendChild(child.copy()));
        }
        return copy;
    }
    xPath() {
        return this.path()
            .slice(1)
            .map((node) => node._index)
            .join('/');
    }
    path(limit) {
        const pathArr = [];
        let node = this;
        while (node != null && (limit == null || pathArr.length < limit)) {
            pathArr.push(node);
            node = node._parent;
        }
        return pathArr.reverse();
    }
    size() {
        return this.toPreOrderUnique().length;
    }
    toPreOrderUnique(nodeSet = new Set()) {
        if (nodeSet.has(this)) {
            return Array.from(nodeSet);
        }
        nodeSet.add(this);
        for (const child of this._children) {
            child.toPreOrderUnique(nodeSet);
        }
        return Array.from(nodeSet);
    }
    toPostOrderUnique(nodeSet = new Set()) {
        if (!nodeSet.has(this)) {
            for (const child of this._children) {
                child.toPostOrderUnique(nodeSet);
            }
            nodeSet.add(this);
        }
        return Array.from(nodeSet);
    }
    removeFromParent() {
        this._parent._children.splice(this._index, 1);
        this._parent.adjustChildIndices();
    }
    childAt(index) {
        return this._children[index];
    }
    getIndex() {
        return this._index;
    }
    setIndex(index) {
        throw new Error('unimplemented');
    }
    getParent() {
        return this._parent;
    }
    insertChild(newIndex, newChild) {
        this._children.splice(newIndex, 0, newChild);
        this.adjustChildIndices();
    }
    getSiblings() {
        if (!this._parent) {
            return [];
        }
        return this._parent._children;
    }
    isRoot() {
        return !this._parent;
    }
    hasInternalOrdering() {
        var _a;
        return this.grammarNode != null && ((_a = this.grammarNode) === null || _a === void 0 ? void 0 : _a.ordered);
    }
    isPropertyNode() {
        return !this.grammarNode;
    }
    isLeaf() {
        if (this.children.length > 0 && this.grammarNode == null) {
            console.warn('broken_leaf', this.label);
        }
        return this.grammarNode != null && this.grammarNode.type === NodeType_1.default.LEAF;
    }
    nonPropertyNodes() {
        return this.toPreOrderUnique().filter((node) => !node.isPropertyNode());
    }
    leaves() {
        return this.toPreOrderUnique().filter((node) => node.isLeaf());
    }
    contentEquals(other) {
        return this.data.equals(other.data);
    }
    degree() {
        return this._children.length;
    }
    changeIndex(newIndex) {
        this._parent._children.splice(this._index, 1);
        this._parent._children.splice(newIndex, 0, this);
        this._parent.adjustChildIndices();
    }
    getLeftSibling() {
        return this.getSiblings()[this._index - 1];
    }
    getRightSibling() {
        return this.getSiblings()[this._index + 1];
    }
    [Symbol.iterator]() {
        return this._children[Symbol.iterator]();
    }
    adjustChildIndices() {
        for (const [i, child] of this._children.entries()) {
            child._parent = this;
            child._index = i;
        }
    }
    matchTo(other) {
        if (this.isMatchedTo(other)) {
            return false;
        }
        if (other.sourceIndex >= 0 &&
            (other.sourceIndex === this.sourceIndex ||
                this.getGroupSourceIndices().includes(other.sourceIndex))) {
            console.warn('match_set_same_tree');
            return false;
        }
        this._matches.push(other);
        other._matches.push(this);
        return true;
    }
    getSingleMatch() {
        if (this._matches.length > 1) {
            throw new Error('single_match_multiple_partners');
        }
        else if (this._matches.length === 0) {
            throw new Error('single_match_no_partner');
        }
        return this._matches[0];
    }
    isMatchedTo(other) {
        return this._matches.includes(other);
    }
    isMatched() {
        return this._matches.length > 0;
    }
    getSingleMatchingMap() {
        return new Map(this.toPreOrderUnique()
            .filter((node) => node.isMatched())
            .map((node) => [node, node.getSingleMatch()]));
    }
    verifySingleMatching() {
        return (!this.isMatched() || (this.matches.length === 1 && this.getSingleMatch().isMatchedTo(this)));
    }
    appendChildExtra(node) {
        this.children.push(node);
    }
    getMatchGroup() {
        return [this, ...this._matches];
    }
    getGroupSourceIndices() {
        return this.getMatchGroup()
            .map((n) => n.sourceIndex)
            .sort();
    }
    getMetaNode() {
        return this.getMatchGroup().sort((a, b) => a.sourceIndex - b.sourceIndex)[0];
    }
    resetMatches() {
        this._matches.splice(0, this._matches.length);
    }
    get workingIndex() {
        return this.origin.workingIndex;
    }
    set workingIndex(index) {
        this.origin.workingIndex = index;
    }
    getAdjacentHigherMatch() {
        const candidates = [...this._matches].filter((m) => m.workingIndex === this.workingIndex + 1);
        if (candidates.length > 0) {
            return candidates[0];
        }
        return null;
    }
    getAdjacentLowerMatch() {
        const candidates = [...this._matches].filter((m) => m.workingIndex === this.workingIndex - 1);
        if (candidates.length > 0) {
            return candidates[0];
        }
        return null;
    }
}
exports.default = TNode;
//# sourceMappingURL=TNode.js.map