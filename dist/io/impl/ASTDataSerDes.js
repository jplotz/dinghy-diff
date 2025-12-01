"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ASTData_1 = __importDefault(require("../../data/ASTData"));
const TNodeDinghyLSerDes_1 = __importDefault(require("../TNodeDinghyLSerDes"));
class ASTDataSerDes extends TNodeDinghyLSerDes_1.default {
    getData(tagName, text, ast) {
        return new ASTData_1.default(tagName, text, ast);
    }
}
exports.default = ASTDataSerDes;
//# sourceMappingURL=ASTDataSerDes.js.map