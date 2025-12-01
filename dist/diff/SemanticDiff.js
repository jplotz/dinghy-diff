"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchPipeline_1 = require("../match/MatchPipeline");
const EditScriptGenerator_1 = require("../delta/EditScriptGenerator");
const Comparator_1 = require("../compare/Comparator");
class SemanticDiff {
    constructor(options) {
        this.options = options;
    }
    diff(oldTree, newTree) {
        const matchPipeline = MatchPipeline_1.MatchPipeline.fromMode(this.options);
        matchPipeline.execute(oldTree, newTree, new Comparator_1.Comparator(this.options));
        const editScriptGenerator = new EditScriptGenerator_1.EditScriptGenerator(this.options);
        const editScript = editScriptGenerator.generateEditScript(oldTree, newTree);
        return editScript;
    }
}
exports.default = SemanticDiff;
//# sourceMappingURL=SemanticDiff.js.map