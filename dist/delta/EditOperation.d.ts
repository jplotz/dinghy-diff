import ChangeType from './ChangeType';
import TNode from '../tree/TNode';
export declare class EditOperation<T> {
    type: ChangeType;
    oldPath?: string;
    newPath?: string;
    oldContent?: TNode<T>;
    newContent?: TNode<T>;
    constructor(type: ChangeType, oldPath?: string, newPath?: string, oldContent?: TNode<T>, newContent?: TNode<T>);
    isDeletion(): Boolean;
    isInsertion(): Boolean;
    isMove(): Boolean;
    isUpdate(): Boolean;
    toString(): string;
}
