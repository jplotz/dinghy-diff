import TNode from '../tree/TNode';
export declare function persistBestMatches<T>(oldNodes: TNode<T>[], newNodes: TNode<T>[], keyFunction: (node: TNode<T>) => any, compareFunction: (node: TNode<T>, other: TNode<T>) => number, matchHandler: (node: TNode<T>, match: TNode<T>) => void, thresholdFunction?: (cv: number) => boolean): void;
