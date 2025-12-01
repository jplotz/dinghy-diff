import ISemanticDiffOptions from './ISemanticDiffOptions';
import TNode from '../tree/TNode';
import { EditScript } from '../delta/EditScript';
export default class SemanticDiff<T> {
    private options;
    constructor(options: ISemanticDiffOptions);
    diff(oldTree: TNode<T>, newTree: TNode<T>): EditScript<T>;
}
