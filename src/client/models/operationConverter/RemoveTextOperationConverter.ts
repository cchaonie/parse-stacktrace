import { InsertTextOperation } from "slate";
import _ from "lodash";

import { JSON0Path } from "./type";
import BaseOperationConverter from "./BaseOperationConverter";

export class RemoveTextOperationConverter extends BaseOperationConverter {
  convert() {
    const json0Path: JSON0Path = [];
    const { path, offset, text } = this.slateOperation as InsertTextOperation;
    _.each(path, (value, index) => {
      json0Path.push(value);
      if (index < path.length - 1) {
        json0Path.push("children");
      }
    });
    json0Path.push("text");

    // offset
    json0Path.push(offset);

    return [
      {
        p: json0Path,
        sd: text,
      },
    ];
  }
}
