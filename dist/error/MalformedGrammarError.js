"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MalformedGrammarError extends Error {
    constructor(message = 'Malformed Grammar') {
        super();
        this.message = message;
        this.name = 'Malformed Grammar';
    }
}
exports.default = MalformedGrammarError;
//# sourceMappingURL=MalformedGrammarError.js.map