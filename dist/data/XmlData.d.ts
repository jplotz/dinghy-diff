import IData from './IData';
import { Nullable } from '../Types';
import ICopyable from './ICopyable';
export default class XmlData implements IData, ICopyable<XmlData> {
    private _label;
    private _text;
    private _attributes;
    constructor(_label: string, _text: Nullable<string>, _attributes?: Map<string, string>);
    equals(other: any): boolean;
    get attributes(): Map<string, string>;
    get label(): string;
    get text(): Nullable<string>;
    set text(text: Nullable<string>);
    copy(): XmlData;
}
