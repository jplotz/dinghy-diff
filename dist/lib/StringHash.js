"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringHash = void 0;
const murmurhash3js_1 = __importDefault(require("murmurhash3js"));
function stringHash(str) {
    return murmurhash3js_1.default.x86.hash32(str);
}
exports.stringHash = stringHash;
//# sourceMappingURL=StringHash.js.map