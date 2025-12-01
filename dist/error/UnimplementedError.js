"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnimplementedError extends Error {
    constructor() {
        super();
        this.message = 'Not implemented';
        this.name = 'UnimplementedError';
    }
}
exports.default = UnimplementedError;
//# sourceMappingURL=UnimplementedError.js.map