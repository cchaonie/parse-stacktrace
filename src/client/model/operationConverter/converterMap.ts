import { InsertTextOperationConverter } from './InsertTextOperationConverter';
import { MergeNodeOperationConverter } from './MergeNodeOperationConverter';
import { RemoveNodeOperationConverter } from './RemoveNodeOperationConverter';
import { RemoveTextOperationConverter } from './RemoveTextOperationConverter';
import { SplitNodeOperationConverter } from './SplitNodeOperationConverter';

export default {
  insert_text: InsertTextOperationConverter,
  remove_text: RemoveTextOperationConverter,
  split_node: SplitNodeOperationConverter,
  remove_node: RemoveNodeOperationConverter,
  merge_node: MergeNodeOperationConverter,
};
