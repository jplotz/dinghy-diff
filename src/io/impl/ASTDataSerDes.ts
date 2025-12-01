import { AbstractNode } from '@tdurieux/dinghy';
import { Nullable } from '../../Types';
import ASTData from '../../data/ASTData';
import TNodeDinghyLSerDes from '../TNodeDinghyLSerDes';

export default class ASTDataSerDes extends TNodeDinghyLSerDes<ASTData> {
  protected getData(
    tagName: string,
    text: Nullable<string>,
    ast: AbstractNode<any>
  ): ASTData {
    return new ASTData(tagName, text, ast);
  }
}
