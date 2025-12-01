import IEditScriptOptions from '../delta/IEditScriptOptions';
import ICompareOptions from '../compare/ICompareOptions';
import IMatchOptions from '../match/IMatchOptions';
import ISerDesOptions from '../io/options/ISerDesOptions';
export default interface ISemanticDiffOptions extends ICompareOptions, IEditScriptOptions, ISerDesOptions, IMatchOptions {
}
export declare const defaultDiffOptions: ISemanticDiffOptions;
