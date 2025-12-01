import IData from './IData';
import { Nullable } from '../Types';
import ICopyable from './ICopyable';
import { AbstractNode } from '@tdurieux/dinghy';
export default class ASTData implements IData, ICopyable<ASTData> {
    private _type;
    private _text;
    node: AbstractNode<any>;
    constructor(_type: string, _text: Nullable<string>, node: AbstractNode<any>);
    equals(other: any): boolean;
    get label(): string;
    get text(): Nullable<string>;
    set text(text: Nullable<string>);
    get attributes(): Map<string, string>;
    copy(): ASTData;
}
