import { BaseOperation } from 'slate';
import { InsertTextOperationConverter } from './InsertTextOperationConverter';
import { RemoveTextOperationConverter } from './RemoveTextOperationConverter';

export default function createConverter(op: BaseOperation) {
  switch (op.type) {
    case 'insert_text':
      return new InsertTextOperationConverter(op);
    case 'remove_text':
      return new RemoveTextOperationConverter(op);
    default:
      throw new Error(`${op.type} is not supported yet`);
  }
}
