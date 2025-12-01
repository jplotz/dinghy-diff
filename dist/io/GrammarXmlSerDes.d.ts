import Grammar from '../grammar/Grammar';
import SerDes from './SerDes';
import IGrammarDeserializationOptions from './options/IGrammarDeserializationOptions';
export default class GrammarXmlSerDes extends SerDes<Grammar> {
    private options;
    constructor(options: IGrammarDeserializationOptions);
    buildString(obj: Grammar): string;
    parseFromString(xml: string, includeChildren?: boolean): Grammar;
    private parseGrammarNodes;
}
