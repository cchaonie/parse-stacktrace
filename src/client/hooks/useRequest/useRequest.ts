import { useEffect } from "react";
import { FailedHandler, SuccessfulHandler } from "./type";

const noop = () => {};

export const useRequest = (
  { url, initOptions = {} }: { url: string; initOptions: RequestInit },
  successfulHandler: SuccessfulHandler = noop,
  failedHandler?: FailedHandler
) => {
  useEffect(() => {
    fetch(url, initOptions)
      .then(successfulHandler)
      .catch((e) => {
        if (typeof failedHandler === "function") {
          failedHandler(e);
        } else {
          console.error(e);
        }
      });
  }, []);
};
