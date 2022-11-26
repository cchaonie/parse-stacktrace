import { SetNodeOperation } from 'slate';
import { JSON0Path } from './type';
import _ from 'lodash';
import BaseOperationConverter from './BaseOperationConverter';
import { convertPath } from '~util/convertPath';

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
