import { ReactNode } from "react";
import { Connection } from "sharedb/lib/client";
import { FileDescription, UserStatus } from "../../models";

export interface SourceEditorProps {
  userStatus: UserStatus;
  activeFile: FileDescription;
  connection: Connection;
}

export interface SourceEditorConnectProps {
  children: (contextValues: SourceEditorProps) => ReactNode;
}
