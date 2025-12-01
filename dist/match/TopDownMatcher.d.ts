import IMatcher from './IMatcher';
import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';
import IMatchOptions from './IMatchOptions';
export default class TopDownMatcher<T> implements IMatcher<T> {
    private options;
    constructor(options: IMatchOptions);
    match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void;
}
