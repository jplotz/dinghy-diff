import TNode from '../tree/TNode';
import IComparator from '../compare/IComparator';
import IMatcher from './IMatcher';
import IPathMatchOptions from './IPathMatchOptions';
export declare class PathMatcher<T> implements IMatcher<T> {
    private options;
    constructor(options: IPathMatchOptions);
    match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void;
}
