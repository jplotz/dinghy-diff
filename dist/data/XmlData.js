"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XmlData {
    constructor(_label, _text, _attributes = new Map()) {
        this._label = _label;
        this._text = _text;
        this._attributes = _attributes;
    }
    equals(other) {
        if (other == null)
            return false;
        if (other === this)
            return true;
        if (!(other instanceof XmlData))
            return false;
        const allAttributeKeys = new Set([...other.attributes.keys(), ...this.attributes.keys()]);
        if (this.label != other.label)
            return false;
        if (this.text != other.text)
            return false;
        for (const key of allAttributeKeys) {
            if (this.attributes.get(key) != other.attributes.get(key))
                return false;
        }
        return true;
    }
    get attributes() {
        return this._attributes;
    }
    get label() {
        return this._label;
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
    }
    copy() {
        const attributesCopy = new Map();
        for (const [key, val] of this._attributes) {
            attributesCopy.set(key, val);
        }
        return new XmlData(this._label, this._text, attributesCopy);
    }
}
exports.default = XmlData;
//# sourceMappingURL=XmlData.js.map