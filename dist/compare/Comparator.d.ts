import Cache from './cache/Cache';
import IComparator from './IComparator';
import TNode from '../tree/TNode';
import ICompareOptions from './ICompareOptions';
import { Nullable } from '../Types';
export declare class Comparator<T> extends Cache<T> implements IComparator<T> {
    options: ICompareOptions;
    private lcsLib;
    constructor(options: ICompareOptions);
    compareCommonality(nodeA: TNode<T>, nodeB: TNode<T>): number;
    compare(nodeA: TNode<T>, nodeB: TNode<T>): number;
    compareContent(nodeA: TNode<T>, nodeB: TNode<T>): number;
    comparePosition(nodeA: TNode<T>, nodeB: TNode<T>): number;
    compareSize(nodeA: TNode<T>, nodeB: TNode<T>): number;
    weightedAverage(items: Nullable<number>[], weights: number[], defaultValue?: number): number;
    private compareLcs;
    private comparePathLcs;
}
