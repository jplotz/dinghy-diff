import ISerDesOptions from './options/ISerDesOptions';
import Grammar from '../grammar/Grammar';
import SerDes from './SerDes';
import { Nullable } from '../Types';
import TNode from '../tree/TNode';
export default abstract class TNodeJsonSerDes<T> extends SerDes<TNode<T>> {
    private grammar;
    private options;
    constructor(grammar: Grammar, options: ISerDesOptions);
    protected abstract getData(tagName: string, text: Nullable<string>, attributes: Map<string, string>): T;
    buildString(node: TNode<T>): string;
    transformParsedJsonObj(parsedJsonObj: any, includeChildren?: boolean): TNode<T>;
    parseFromString(jsonString: string, includeChildren?: boolean): TNode<T>;
}
