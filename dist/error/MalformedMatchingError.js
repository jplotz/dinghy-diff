"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MalformedMatchingError extends Error {
    constructor(message = 'Malformed Matching') {
        super();
        this.message = message;
        this.name = 'MalformedMatchingError';
    }
}
exports.default = MalformedMatchingError;
//# sourceMappingURL=MalformedMatchingError.js.map