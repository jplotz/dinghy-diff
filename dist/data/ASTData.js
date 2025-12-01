"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ASTData {
    constructor(_type, _text, node) {
        this._type = _type;
        this._text = _text;
        this.node = node;
    }
    equals(other) {
        if (other == null)
            return false;
        if (other === this)
            return true;
        if (!(other instanceof ASTData))
            return false;
        if (this.label != other.label)
            return false;
        if (this.text != other.text)
            return false;
        return true;
    }
    get label() {
        return this._type;
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
    }
    get attributes() {
        return new Map();
    }
    copy() {
        return new ASTData(this._type, this._text, this.node);
    }
}
exports.default = ASTData;
//# sourceMappingURL=ASTData.js.map