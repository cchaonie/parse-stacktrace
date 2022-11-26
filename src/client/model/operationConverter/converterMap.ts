import { InsertTextOperationConverter } from './InsertTextOperationConverter';
import { RemoveTextOperationConverter } from './RemoveTextOperationConverter';
import { MergeNodeOperationConverter } from './MergeNodeOperationConverter';
import { RemoveNodeOperationConverter } from './RemoveNodeOperationConverter';
import { SplitNodeOperationConverter } from './SplitNodeOperationConverter';
import { SetNodeOperationConverter } from './SetNodeOperationConverter';

export default {
  insert_text: InsertTextOperationConverter,
  remove_text: RemoveTextOperationConverter,
  split_node: SplitNodeOperationConverter,
  remove_node: RemoveNodeOperationConverter,
  merge_node: MergeNodeOperationConverter,
  set_node: SetNodeOperationConverter,
};
