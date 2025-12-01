import SerDes from './SerDes';
import ISerDesOptions from './options/ISerDesOptions';
import Grammar from '../grammar/Grammar';
import { Nullable } from '../Types';
import TNode from '../tree/TNode';
export default abstract class TNodeXMLSerDes<T> extends SerDes<TNode<T>> {
    private grammar;
    private options;
    constructor(grammar: Grammar, options: ISerDesOptions);
    protected abstract getData(tagName: string, text: Nullable<string>, attributes: Map<string, string>): T;
    buildString(node: TNode<T>): string;
    buildXmlDom(ownerDocument: any, node: TNode<T>): any;
    parseXmlDom(xmlElement: Element, includeChildren?: boolean): TNode<T>;
    parseFromString(xml: string, includeChildren?: boolean): TNode<T>;
}
