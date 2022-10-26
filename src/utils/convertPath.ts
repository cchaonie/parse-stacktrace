import _ from 'lodash';
import { Path } from 'slate';
/**
 * Convert slate path to the keys array.
 * For example, [0, 0] => [0, 'children', 0]
 * @param path slate Path
 * @returns 
 */
export const convertPath = (path: Path) =>
  _.reduce(
    path,
    (prev, curr, index) => {
      prev.push(curr);
      if (index < path.length - 1) {
        prev.push('children');
      }
      return prev;
    },
    []
  );
