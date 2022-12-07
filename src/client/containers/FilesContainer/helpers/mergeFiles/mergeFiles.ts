import { FileDescription } from '../../../../models';

export const mergeFiles = (
  existingFiles: FileDescription[],
  newFilesDescription: Array<
    Pick<FileDescription, 'name' | 'creator' | 'createTime'>
  >
) => {
  const newFiles = newFilesDescription.map(
    ({ name, creator, createTime }) =>
      new FileDescription(name, creator, createTime)
  );
  const filesNotInNew = [];
  for (let f of existingFiles) {
    let exist = null;
    for (let nf of newFiles) {
      if (nf.name === f.name && nf.creator === f.creator) {
        exist = nf;
        break;
      }
    }

    if (exist) {
      exist.active = f.active;
    } else {
      filesNotInNew.push(f);
    }
  }
  return [...newFiles, ...filesNotInNew].sort(
    (f1, f2) => f1.createTime - f2.createTime
  );
};
