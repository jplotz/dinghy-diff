import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';
import IMatcher from './IMatcher';
import IMatchOptions from './IMatchOptions';
export declare class SimilarityMatcher<T> implements IMatcher<T> {
    private options;
    constructor(options: IMatchOptions);
    match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void;
}
