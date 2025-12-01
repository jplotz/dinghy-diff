"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditOperation = void 0;
const ChangeType_1 = __importDefault(require("./ChangeType"));
class EditOperation {
    constructor(type, oldPath, newPath, oldContent, newContent) {
        this.type = type;
        this.oldPath = oldPath;
        this.newPath = newPath;
        this.oldContent = oldContent;
        this.newContent = newContent;
    }
    isDeletion() {
        return this.type === ChangeType_1.default.DELETION;
    }
    isInsertion() {
        return this.type === ChangeType_1.default.INSERTION;
    }
    isMove() {
        return this.type === ChangeType_1.default.MOVE;
    }
    isUpdate() {
        return this.type === ChangeType_1.default.UPDATE;
    }
    toString() {
        return (this.type +
            ' ' +
            (this.oldPath !== null ? this.oldPath + ' ' : '') +
            (this.oldPath !== null && this.newPath !== null ? '-> ' : '') +
            (this.newPath !== null ? this.newPath + ' ' : '') +
            (this.newContent !== null ? this.newContent + ' ' : ''));
    }
}
exports.EditOperation = EditOperation;
//# sourceMappingURL=EditOperation.js.map