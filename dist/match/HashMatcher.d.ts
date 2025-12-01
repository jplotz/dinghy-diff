import IMatcher from './IMatcher';
import TNode from '../tree/TNode';
import IComparator from '../compare/IComparator';
export declare class HashMatcher<T> implements IMatcher<T> {
    match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void;
}
