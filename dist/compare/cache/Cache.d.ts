import ICache from './ICache';
import TNode from '../../tree/TNode';
import { Nullable } from '../../Types';
export default class Cache<T> implements ICache<T> {
    private readonly propertyExtractor;
    private readonly contentHashExtractor;
    private readonly hashExtractor;
    private readonly sizeExtractor;
    getHash(node: TNode<T>): number;
    getContentHash(node: TNode<T>): number;
    getSize(node: TNode<T>): number;
    getProperties(node: TNode<T>): Map<string, Nullable<string>>;
}
