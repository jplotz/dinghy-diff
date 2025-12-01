import IMatcher from './IMatcher';
import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';
export declare class PropertyMatcher<T> implements IMatcher<T> {
    match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void;
    private matchProperties;
}
