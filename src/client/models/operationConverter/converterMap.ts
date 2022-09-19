import { InsertTextOperationConverter } from './InsertTextOperationConverter';
import { RemoveTextOperationConverter } from './RemoveTextOperationConverter';

export default {
  insert_text: InsertTextOperationConverter,
  remove_text: RemoveTextOperationConverter,
  split_node: RemoveTextOperationConverter
};
