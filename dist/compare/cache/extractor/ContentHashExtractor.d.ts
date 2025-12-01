import TNode from '../../../tree/TNode';
import CachingExtractor from './CachingExtractor';
import PropertyExtractor from './PropertyExtractor';
export default class ContentHashExtractor<T> extends CachingExtractor<number, T> {
    private readonly propertyExtractor;
    constructor(propertyExtractor: PropertyExtractor<T>);
    protected computeValue(node: TNode<T>): void;
    private contentHash;
}
