import TNode from '../tree/TNode';
import ISemanticDiffOptions from '../diff/ISemanticDiffOptions';
export default class DeltaTreeGenerator<T> {
    moveMap: Map<TNode<T>, TNode<T>>;
    generate(oldTree: TNode<T>, newTree: TNode<T>, options: ISemanticDiffOptions): TNode<T>;
    generateEditScript(oldTree: TNode<T>, newTree: TNode<T>): void;
    alignChildren(oldParent: TNode<T>): void;
    private findInsertionIndex;
    private insert;
    private move;
    private update;
}
