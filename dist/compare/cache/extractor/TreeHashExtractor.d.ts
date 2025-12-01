import CachingExtractor from './CachingExtractor';
import TNode from '../../../tree/TNode';
import ContentHashExtractor from './ContentHashExtractor';
export default class TreeHashExtractor<T> extends CachingExtractor<number, T> {
    private readonly contentHashExtractor;
    constructor(contentHashExtractor: ContentHashExtractor<T>);
    protected computeValue(node: TNode<T>): void;
    private childHash;
}
