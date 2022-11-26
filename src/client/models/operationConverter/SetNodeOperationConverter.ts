import { SetNodeOperation } from 'slate';
import _ from 'lodash';

import { JSON0Path } from './type';
import BaseOperationConverter from './BaseOperationConverter';
import { convertPath } from '../../../utils';

export class SetNodeOperationConverter extends BaseOperationConverter {
  convert() {
    const { path, newProperties, properties } = this
      .slateOperation as SetNodeOperation;
    const json0Path: JSON0Path = convertPath(path);

    const targetObject = _.get(this.docData, json0Path);

    const deleteOp = {
      p: json0Path,
      ld: targetObject,
    };

    const newObject = {
      ...targetObject,
      ...properties,
      ...newProperties,
    };

    const insertOp = {
      p: json0Path,
      li: newObject,
    };
    return [deleteOp, insertOp];
  }
}
