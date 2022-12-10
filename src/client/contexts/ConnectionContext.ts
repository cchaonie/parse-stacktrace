import React from "react";
import { Connection } from "sharedb/lib/client";

export interface ConnectionValue {
  connection: Connection;
}

export const ConnectionContext = React.createContext<ConnectionValue | null>(
  null
);
