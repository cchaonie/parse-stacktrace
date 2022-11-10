import { BaseOperation, Descendant } from 'slate';
import converterMap from './converterMap';

export default function createConverter(docData: Descendant[], op: BaseOperation) {
  const OperationConverter = converterMap[op.type];
  if (OperationConverter) {
    return new OperationConverter(docData, op);
  }
  throw new Error(`${op.type} is not supported yet`);
}
