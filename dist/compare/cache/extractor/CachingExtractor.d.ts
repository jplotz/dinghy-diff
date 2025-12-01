import TNode from '../../../tree/TNode';
export default abstract class CachingExtractor<D, T> {
    protected valueMap: Map<TNode<T>, D>;
    get(node: TNode<T>): D;
    protected abstract computeValue(node: TNode<T>): void;
}
