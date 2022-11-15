import { SplitNodeOperation } from 'slate';
import { JSON0Path } from './type';
import _ from 'lodash';
import BaseOperationConverter from './BaseOperationConverter';
import { convertPath } from '~util/convertPath';

export class SplitNodeOperationConverter extends BaseOperationConverter {
  convert() {
    const { path, position, properties } = this
      .slateOperation as SplitNodeOperation;
    const json0Path: JSON0Path = convertPath(path);

    if (Object.keys(properties).length) {
      // We are splitting paragraph
      const targetListPath = [...json0Path, 'children'];
      const targetList = _.get(this.docData, targetListPath);
      const splitObj = targetList[position];

      const deleteOp = {
        p: [...targetListPath, position],
        ld: splitObj,
      };

      const upperLevel = [...path];
      const insertTargetIndex = upperLevel.pop();

      const upperLevelPath = convertPath(upperLevel);
      const insertOp = {
        p: upperLevelPath.length
          ? [...upperLevelPath, 'children', insertTargetIndex + 1]
          : [insertTargetIndex + 1],
        li: {
          ...properties,
          children: [splitObj],
        },
      };
      return [deleteOp, insertOp];
    } else {
      // We are splitting text node
      const deletePosition = [...json0Path, 'text'];
      const target = _.get(this.docData, deletePosition);

      const splitText = target.substring(position);

      const deleteOp = {
        p: [...deletePosition, position],
        sd: splitText,
      };

      const upperLevel = [...path];
      const insertTargetIndex = upperLevel.pop();

      const upperLevelPath = convertPath(upperLevel);

      const insertOp = {
        p: [...upperLevelPath, 'children', insertTargetIndex + 1],
        li: {
          text: splitText,
        },
      };
      return [deleteOp, insertOp];
    }
  }
}
