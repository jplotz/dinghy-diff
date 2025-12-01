import IMatcher from './IMatcher';
import TNode from '../tree/TNode';
import IComparator from '../compare/IComparator';
import IMatchOptions from './IMatchOptions';
export declare class MatchPipeline<T> {
    private matchers;
    constructor(matchers: IMatcher<T>[]);
    static fromMode(options: IMatchOptions): MatchPipeline<unknown>;
    static topDownOnly(options: IMatchOptions): MatchPipeline<unknown>;
    static bottomUpOnly(options: IMatchOptions): MatchPipeline<unknown>;
    static onlySimpleMatchers(options: IMatchOptions): MatchPipeline<unknown>;
    execute(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void;
    private verifyMatching;
}
