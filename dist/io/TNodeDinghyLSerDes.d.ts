import SerDes from './SerDes';
import { Nullable } from '../Types';
import TNode from '../tree/TNode';
import { AbstractNode } from '@tdurieux/dinghy';
export default abstract class TNodeDinghyLSerDes<T> extends SerDes<TNode<T>> {
    constructor();
    protected abstract getData(type: string, text: Nullable<string>, ast: AbstractNode<any>): T;
    buildString(node: TNode<T>): string;
    parseAST(ast: AbstractNode<any>, includeChildren?: boolean): TNode<T>;
    parseFromString(code: string, includeChildren?: boolean): TNode<T>;
}
