import { EditOperation } from './EditOperation';
import TNode from '../tree/TNode';
export declare class EditScript<T> {
    private editOperations;
    private cost;
    constructor(editOperations: EditOperation<T>[] | undefined, cost: number | undefined);
    getCost(): number;
    appendDeletion(deletedNode: TNode<T>): void;
    [Symbol.iterator](): IterableIterator<EditOperation<T>>;
    appendInsertion(insertedNode: TNode<T>): void;
    appendMove(oldPath: string, newPath: string, oldNode: TNode<T>, newNode: TNode<T>): void;
    appendUpdate(oldNode: TNode<T>, updatedNode: TNode<T>): void;
    deletions(): EditOperation<T>[];
    insertions(): EditOperation<T>[];
    moves(): EditOperation<T>[];
    size(): number;
    updates(): EditOperation<T>[];
}
