"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComparisonType_1 = __importDefault(require("./ComparisonType"));
class WeightedCV {
    constructor(path, weight = 1, comparisonType = ComparisonType_1.default.EQ) {
        this.path = path;
        this.weight = weight;
        this.comparisonType = comparisonType;
    }
}
exports.default = WeightedCV;
//# sourceMappingURL=WeightedCV.js.map