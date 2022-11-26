import { MergeNodeOperation } from 'slate';
import _ from 'lodash';

import { JSON0Path } from './type';
import BaseOperationConverter from './BaseOperationConverter';
import { convertPath } from '../../utils';

export class MergeNodeOperationConverter extends BaseOperationConverter {
  convert() {
    const { path, position, properties } = this
      .slateOperation as MergeNodeOperation;

    const json0Path: JSON0Path = convertPath(path);

    if (Object.keys(properties).length) {
      // We are merging 2 paragraphs
      const targetListPath = [...json0Path];
      const toBeMergedObj = _.get(this.docData, targetListPath);

      const deleteOp = {
        p: targetListPath,
        ld: toBeMergedObj,
      };

      const siblingLevel = [...path];
      const insertTargetIndex = siblingLevel.pop();
      siblingLevel.push(insertTargetIndex - 1);

      const siblingLevelPath = convertPath(siblingLevel);
      const insertOp = {
        p: [...siblingLevelPath, 'children', position],
        li: {
          ..._.get(toBeMergedObj, ['children', 0]),
        },
      };
      return [deleteOp, insertOp];
    } else {
      // We are merging 2 texts
      const deletePosition = [...json0Path];
      const target = _.get(this.docData, deletePosition);

      const deleteOp = {
        p: deletePosition,
        ld: target,
      };

      const splitText = target['text'];

      const siblingLevel = [...path];
      const insertTargetIndex = siblingLevel.pop();
      siblingLevel.push(insertTargetIndex - 1);

      const siblingLevelPath = convertPath(siblingLevel);

      const insertOp = {
        p: [...siblingLevelPath, 'text', position],
        si: splitText,
      };
      return [deleteOp, insertOp];
    }
  }
}
