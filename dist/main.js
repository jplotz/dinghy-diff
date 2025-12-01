"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const fs = __importStar(require("fs"));
const ISemanticDiffOptions_1 = require("./diff/ISemanticDiffOptions");
const SemanticDiff_1 = __importDefault(require("./diff/SemanticDiff"));
const DeltaTreeGenerator_1 = __importDefault(require("./delta/DeltaTreeGenerator"));
const ASTDataSerDes_1 = __importDefault(require("./io/impl/ASTDataSerDes"));
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('diff <old> <new>', 'Calculate the difference between two source files. The supported languages are Dockerfile and Shell.', (yargs) => {
    yargs
        .positional('old', {
        description: 'Path to the original document',
        type: 'string'
    })
        .positional('new', {
        description: 'Path to the changed document',
        type: 'string'
    })
        .option('format', {
        description: 'Select the output format',
        alias: 'f',
        type: 'string',
        choices: ['editScript', 'deltaTree'],
        default: 'editScript'
    })
        .check((argv) => {
        if (argv.old == null || !fs.existsSync(argv.old)) {
            throw new Error(argv.old + ' ist not a valid file path');
        }
        if (argv.new == null || !fs.existsSync(argv.new)) {
            throw new Error(argv.new + ' ist not a valid file path');
        }
        return true;
    });
}, (argv) => {
    const tNodeSerDes = new ASTDataSerDes_1.default();
    const oldTree = tNodeSerDes.parseFromString(fs.readFileSync(argv.old).toString());
    const newTree = tNodeSerDes.parseFromString(fs.readFileSync(argv.new).toString());
    switch (argv.format) {
        case 'editScript': {
            const editScript = new SemanticDiff_1.default(ISemanticDiffOptions_1.defaultDiffOptions).diff(oldTree, newTree);
            for (const edit of editScript) {
                if (edit.type === 'update') {
                    console.log('UPDATE', edit.oldContent.data.node.toString(), edit.newContent.data.node.toString(), 'at line', edit.oldContent.data.node.position.lineStart);
                }
                else if (edit.type === 'insert') {
                    console.log('INSERT', edit.newContent.data.node.toString(), 'at line', edit.newContent.data.node.position.lineStart);
                }
                else if (edit.type === 'delete') {
                    console.log('DELETE', edit.oldContent.data.node.toString(), 'at line', edit.oldContent.data.node.position.lineStart);
                }
                else if (edit.type === 'move') {
                    console.log('MOVE', edit.oldContent.data.node.toString(), 'from line', edit.oldContent.data.node.position.lineStart, 'to line', edit.newContent.data.node.position.lineStart);
                }
            }
            break;
        }
        case 'deltaTree': {
            const deltaTreeGenerator = new DeltaTreeGenerator_1.default();
            const deltaTree = deltaTreeGenerator.generate(oldTree, newTree, ISemanticDiffOptions_1.defaultDiffOptions);
            console.log(tNodeSerDes.buildString(deltaTree));
            break;
        }
    }
})
    .help()
    .version()
    .demandCommand()
    .strictCommands().argv;
//# sourceMappingURL=main.js.map