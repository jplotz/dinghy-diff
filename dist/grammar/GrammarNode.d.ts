import WeightedCV from './WeightedCV';
import NodeType from './NodeType';
export default class GrammarNode {
    type: NodeType;
    label: string;
    weightedCVs: WeightedCV[];
    ordered: boolean;
    constructor(type: NodeType, label: string, weightedCVs: WeightedCV[], ordered?: boolean);
}
