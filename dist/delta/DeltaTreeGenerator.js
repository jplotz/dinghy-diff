"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lis_1 = require("../lib/Lis");
const MatchPipeline_1 = require("../match/MatchPipeline");
const Comparator_1 = require("../compare/Comparator");
class DeltaTreeGenerator {
    constructor() {
        this.moveMap = new Map();
    }
    generate(oldTree, newTree, options) {
        const matchPipeline = MatchPipeline_1.MatchPipeline.fromMode(options);
        matchPipeline.execute(oldTree, newTree, new Comparator_1.Comparator(options));
        this.moveMap = new Map();
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
                this.insert(newNode);
            }
        }
        return oldTree;
    }
    generateEditScript(oldTree, newTree) {
        const copyOfOld = oldTree.copy();
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
                this.insert(newNode);
            }
        }
        for (const oldNode of oldTree.toPreOrderUnique()) {
            if (oldNode.hasInternalOrdering()) {
                this.alignChildren(oldNode);
            }
        }
    }
    alignChildren(oldParent) {
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
                        continue outer;
                    }
                }
                node.changeIndex(nodes.length - 1);
                const newPath = node.xPath();
            }
        }
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
    insert(newNode) {
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
    }
    move(oldNode) {
        const newNode = oldNode.getSingleMatch();
        const copyOfNewNode = newNode.copy(false);
        for (const oldChild of oldNode.children) {
            copyOfNewNode.appendChild(oldChild);
        }
        copyOfNewNode.attributes.set('COPY', 'TRUE');
        this.moveMap.set(newNode, copyOfNewNode);
        copyOfNewNode.matchTo(newNode);
        const insertionIndex = this.findInsertionIndex(newNode);
        const newParent = newNode.getParent().getSingleMatch();
        newParent.insertChild(insertionIndex, copyOfNewNode);
    }
    update(oldNode) {
        const newNode = oldNode.getSingleMatch();
        oldNode.attributes.clear();
        for (const [key, val] of newNode.attributes) {
            oldNode.attributes.set(key, val);
        }
        oldNode.text = newNode.text;
    }
}
exports.default = DeltaTreeGenerator;
//# sourceMappingURL=DeltaTreeGenerator.js.map