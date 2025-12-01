import ComparisonType from './ComparisonType';
export default class WeightedCV {
    path: string;
    weight: number;
    comparisonType: ComparisonType;
    constructor(path: string, weight?: number, comparisonType?: ComparisonType);
}
