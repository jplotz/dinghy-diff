export default abstract class SerDes<T> {
    abstract parseFromString(xml: string, includeChildren: boolean): T;
    abstract buildString(obj: T): string;
}
