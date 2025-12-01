"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XmlData_1 = __importDefault(require("../../data/XmlData"));
const TNodeJsonSerDes_1 = __importDefault(require("../TNodeJsonSerDes"));
class XmlDataJsonSerDes extends TNodeJsonSerDes_1.default {
    getData(tagName, text, attributes) {
        return new XmlData_1.default(tagName, text, attributes);
    }
}
exports.default = XmlDataJsonSerDes;
//# sourceMappingURL=XmlDataJsonSerDes.js.map