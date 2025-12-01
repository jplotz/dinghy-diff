"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TNodeXMLSerDes_1 = __importDefault(require("../TNodeXMLSerDes"));
const XmlData_1 = __importDefault(require("../../data/XmlData"));
class XmlDataSerDes extends TNodeXMLSerDes_1.default {
    getData(tagName, text, attributes) {
        return new XmlData_1.default(tagName, text, attributes);
    }
}
exports.default = XmlDataSerDes;
//# sourceMappingURL=XmlDataSerDes.js.map