"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EditScriptGenerator_instances, _EditScriptGenerator_alignChildren, _EditScriptGenerator_insert;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditScriptGenerator = void 0;
const EditScript_1 = require("./EditScript");
const Lis_1 = require("../lib/Lis");
class EditScriptGenerator {
    constructor(options) {
        _EditScriptGenerator_instances.add(this);
        this.options = options;
        this.editScript = new EditScript_1.EditScript(undefined, undefined);
    }
    generateEditScript(oldTree, newTree) {
        const copyOfOld = oldTree.copy();
        this.editScript = new EditScript_1.EditScript(undefined, undefined);
        const newPreOrder = newTree.toPreOrderUnique();
        for (const newNode of newPreOrder) {
            if (newNode.isMatched()) {
                const match = newNode.getSingleMatch();
                if (!newNode.isRoot() && newNode.getParent().getSingleMatch() !== match.getParent()) {
                    this.move(match);
                }
                if (!newNode.contentEquals(match)) {
                    this.update(match);
                }
            }
            else {
                __classPrivateFieldGet(this, _EditScriptGenerator_instances, "m", _EditScriptGenerator_insert).call(this, newNode);
            }
        }
        const oldPreOrder = oldTree.toPreOrderUnique();
        for (let i = 0; i < oldPreOrder.length; i++) {
            const oldNode = oldPreOrder[i];
            if (!oldNode.isMatched()) {
                i += oldNode.size() - 1;
                this.delete(oldNode);
            }
        }
        for (const oldNode of oldTree.toPreOrderUnique()) {
            if (this.options.EXACT_EDIT_SCRIPT || oldNode.hasInternalOrdering()) {
                __classPrivateFieldGet(this, _EditScriptGenerator_instances, "m", _EditScriptGenerator_alignChildren).call(this, oldNode);
            }
        }
        return this.editScript;
    }
    delete(oldNode) {
        oldNode.removeFromParent();
        this.editScript.appendDeletion(oldNode);
    }
    findInsertionIndex(newNode) {
        let insertionIndex;
        if (newNode.getIndex() > 0) {
            const leftSibling = newNode.getSiblings()[newNode.getIndex() - 1];
            insertionIndex = leftSibling.getSingleMatch().getIndex() + 1;
        }
        else {
            insertionIndex = 0;
        }
        return insertionIndex;
    }
    move(oldNode) {
        const newNode = oldNode.getSingleMatch();
        const oldPath = oldNode.xPath();
        oldNode.removeFromParent();
        const insertionIndex = this.findInsertionIndex(newNode);
        const newParent = newNode.getParent().getSingleMatch();
        newParent.insertChild(insertionIndex, oldNode);
        const newPath = oldNode.xPath();
        this.editScript.appendMove(oldPath, newPath, oldNode, newNode);
    }
    update(oldNode) {
        const newNode = oldNode.getSingleMatch();
        oldNode.attributes.clear();
        for (const [key, val] of newNode.attributes) {
            oldNode.attributes.set(key, val);
        }
        oldNode.text = newNode.text;
        this.editScript.appendUpdate(oldNode, newNode);
    }
}
exports.EditScriptGenerator = EditScriptGenerator;
_EditScriptGenerator_instances = new WeakSet(), _EditScriptGenerator_alignChildren = function _EditScriptGenerator_alignChildren(oldParent) {
    const nodes = oldParent.children;
    const lis = (0, Lis_1.getLis)(nodes.map((node) => node.getSingleMatch().getIndex()));
    const inLis = new Set();
    for (const index of lis) {
        inLis.add(nodes[index]);
    }
    outer: for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!inLis.has(node)) {
            inLis.add(node);
            i--;
            const oldPath = node.xPath();
            const thisMatchIndex = node.getSingleMatch().getIndex();
            for (let j = 0; j < nodes.length; j++) {
                const lisMatchIndex = nodes[j].getSingleMatch().getIndex();
                if (inLis.has(nodes[j]) && lisMatchIndex > thisMatchIndex) {
                    node.changeIndex(j > node.getIndex() ? j - 1 : j);
                    const newPath = node.xPath();
                    this.editScript.appendMove(oldPath, newPath, node, node.getSingleMatch());
                    continue outer;
                }
            }
            node.changeIndex(nodes.length - 1);
            const newPath = node.xPath();
            this.editScript.appendMove(oldPath, newPath, node, node.getSingleMatch());
        }
    }
}, _EditScriptGenerator_insert = function _EditScriptGenerator_insert(newNode) {
    const copy = newNode.copy(true);
    const deleteLater = [];
    const matchOrRemove = (copiedNode, newNode) => {
        if (newNode.isMatched()) {
            deleteLater.push(copiedNode);
        }
        else {
            newNode.matchTo(copiedNode);
            for (let i = 0; i < copiedNode.degree(); i++) {
                matchOrRemove(copiedNode.childAt(i), newNode.childAt(i));
            }
        }
    };
    matchOrRemove(copy, newNode);
    for (const copiedNode of deleteLater) {
        copiedNode.removeFromParent();
    }
    const insertionIndex = this.findInsertionIndex(newNode);
    const newParent = newNode.getParent().getSingleMatch();
    newParent.insertChild(insertionIndex, copy);
    this.editScript.appendInsertion(copy);
};
//# sourceMappingURL=EditScriptGenerator.js.map