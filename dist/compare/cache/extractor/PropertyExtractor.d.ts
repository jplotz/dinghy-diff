import CachingExtractor from './CachingExtractor';
import TNode from '../../../tree/TNode';
import { Nullable } from '../../../Types';
export default class PropertyExtractor<T> extends CachingExtractor<Map<string, Nullable<string>>, T> {
    protected computeValue(node: TNode<T>): void;
    private accessProperty;
}
