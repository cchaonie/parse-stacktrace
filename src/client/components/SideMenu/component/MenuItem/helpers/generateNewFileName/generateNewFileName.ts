import { defaultFileExtension, defaultFileName } from '../../constant';

export const generateNewFileName = (fileNames: string[]) => {
  console.log(fileNames);
  let index = 1;
  while (
    isFileNameExist(
      fileNames,
      `${defaultFileName}${index}.${defaultFileExtension}`
    )
  ) {
    index += 1;
  }
  return `${defaultFileName}${index}.${defaultFileExtension}`;
};

function isFileNameExist(fileNames: string[], newFileName: string) {
  return fileNames.includes(newFileName);
}
