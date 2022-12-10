import { RemoveNodeOperation } from "slate";
import _ from "lodash";

import { JSON0Path } from "./type";
import BaseOperationConverter from "./BaseOperationConverter";

export class RemoveNodeOperationConverter extends BaseOperationConverter {
  convert() {
    const json0Path: JSON0Path = [];
    const { path, node } = this.slateOperation as RemoveNodeOperation;

    _.each(path, (value) => {
      json0Path.push(value);
    });

    return [
      {
        p: json0Path,
        ld: node,
      },
    ];
  }
}
