"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditScript = void 0;
const EditOperation_1 = require("./EditOperation");
const ChangeType_1 = __importDefault(require("./ChangeType"));
class EditScript {
    constructor(editOperations, cost) {
        this.editOperations = [];
        this.cost = 0;
        if (editOperations)
            this.editOperations = editOperations;
        if (cost)
            this.cost = cost;
    }
    getCost() {
        return this.cost;
    }
    appendDeletion(deletedNode) {
        this.editOperations.push(new EditOperation_1.EditOperation(ChangeType_1.default.DELETION, deletedNode.xPath(), undefined, deletedNode.copy()));
        this.cost += deletedNode.size();
    }
    [Symbol.iterator]() {
        return this.editOperations[Symbol.iterator]();
    }
    appendInsertion(insertedNode) {
        this.editOperations.push(new EditOperation_1.EditOperation(ChangeType_1.default.INSERTION, undefined, insertedNode.xPath(), undefined, insertedNode.copy(false)));
        this.cost += insertedNode.size();
    }
    appendMove(oldPath, newPath, oldNode, newNode) {
        this.editOperations.push(new EditOperation_1.EditOperation(ChangeType_1.default.MOVE, oldPath, newPath, oldNode.copy(false), newNode.copy(false)));
        this.cost++;
    }
    appendUpdate(oldNode, updatedNode) {
        this.editOperations.push(new EditOperation_1.EditOperation(ChangeType_1.default.UPDATE, updatedNode.xPath(), undefined, oldNode.copy(false), updatedNode.copy(false)));
        this.cost++;
    }
    deletions() {
        return this.editOperations.filter((editOp) => editOp.isDeletion());
    }
    insertions() {
        return this.editOperations.filter((editOp) => editOp.isInsertion());
    }
    moves() {
        return this.editOperations.filter((editOp) => editOp.isMove());
    }
    size() {
        return this.editOperations.length;
    }
    updates() {
        return this.editOperations.filter((editOp) => editOp.isUpdate());
    }
}
exports.EditScript = EditScript;
//# sourceMappingURL=EditScript.js.map