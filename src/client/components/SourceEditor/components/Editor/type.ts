import { Descendant } from "slate";
import { ReactEditor } from "slate-react";

export interface EditorProps {
  instance: ReactEditor;
  initialValue: Descendant[];
  source: any;
}
