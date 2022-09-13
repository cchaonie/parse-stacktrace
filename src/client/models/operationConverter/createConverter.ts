import { BaseOperation } from 'slate';
import converterMap from './converterMap';

export default function createConverter(op: BaseOperation) {
  const OperationConverter = converterMap[op.type];
  if (OperationConverter) {
    return new OperationConverter(op);
  }
  throw new Error(`${op.type} is not supported yet`);
}
