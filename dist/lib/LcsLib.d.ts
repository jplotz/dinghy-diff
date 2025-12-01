import ICompareOptions from '../compare/ICompareOptions';
export default class LcsLib {
    private options;
    private fastDp;
    constructor(options: ICompareOptions);
    getLcsLength<T>(seqA: T[], seqB: T[], compare?: (a: T, b: T) => boolean): number;
    getLcsLengthFast(seqA: number[], seqB: number[]): number;
}
