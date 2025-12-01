import TNode from '../tree/TNode';
import { EditScript } from './EditScript';
import IEditScriptOptions from './IEditScriptOptions';
export declare class EditScriptGenerator<T> {
    #private;
    options: IEditScriptOptions;
    private editScript;
    constructor(options: IEditScriptOptions);
    generateEditScript(oldTree: TNode<T>, newTree: TNode<T>): EditScript<T>;
    private delete;
    private findInsertionIndex;
    private move;
    private update;
}
