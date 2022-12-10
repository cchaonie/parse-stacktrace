import { memo, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext, FilesContext } from "../../contexts";
import { FileDescription } from "../../models";
import { parseUrl } from "../../utils";
import { mergeFiles } from "./helpers";

const FilesContainer = ({ children }) => {
  const location = useLocation();
  const { userId } = useContext(AuthContext);

  const [_, collectionId, documentName] = parseUrl(location.pathname);

  const [files, setFiles] = useState<FileDescription[]>(() => {
    if (collectionId && documentName) {
      // the path is copied from the other users, so we are not going to show the file in the side menu
      const file = new FileDescription(documentName, collectionId, +new Date());
      file.active = true;
      return [file];
    }
    return [];
  });

  useEffect(() => {
    fetch(`/files?userId=${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(({ message, data }: any) => {
        if (message === "OK") {
          const userFiles = data as Array<any>;

          setFiles(mergeFiles(files, userFiles));
        }
      });
  }, [userId]);

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default memo(FilesContainer);
