import { BaseOperation } from 'slate';
import { InsertTextOperationConverter } from './InsertTextOperationConverter';

export default function createConverter(op: BaseOperation) {
  switch (op.type) {
    case 'insert_text':
      return new InsertTextOperationConverter(op);
    default:
      throw new Error(`${op.type} is not supported yet`);
  }
}
