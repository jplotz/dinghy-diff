import { Nullable } from '../Types';
import Equatable from './Equatable';
export default interface IData extends Equatable {
    get label(): string;
    get text(): Nullable<string>;
    set text(text: Nullable<string>);
    get attributes(): Map<string, string>;
}
