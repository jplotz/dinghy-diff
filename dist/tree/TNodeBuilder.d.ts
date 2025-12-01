import GrammarNode from '../grammar/GrammarNode';
import TNode from './TNode';
export default class TNodeBuilder<T> {
    private _children;
    private _data;
    private _grammarNode;
    children(children: TNode<T>[]): TNodeBuilder<T>;
    data(data: T): TNodeBuilder<T>;
    grammarNode(grammarNode: GrammarNode): TNodeBuilder<T>;
    build(): TNode<T>;
}
