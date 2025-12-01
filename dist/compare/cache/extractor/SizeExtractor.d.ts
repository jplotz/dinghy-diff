import CachingExtractor from './CachingExtractor';
import TNode from '../../../tree/TNode';
export default class SizeExtractor<T> extends CachingExtractor<number, T> {
    protected computeValue(node: TNode<T>): void;
}
