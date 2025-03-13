import { Configuration } from "./openapi/configuration";
import Cookies from "js-cookie";

export type Mode = "_local" | "develop" | "staging" | "production";

type BaseOptions = {
  withCredentials: boolean;
  headers?: {
    "X-CSRF-TOKEN": string;
  };
};

export const generateConfig = (
  submodule: string,
  setToken = true
): Configuration => {
  const mode: Mode = import.meta.env.MODE as Mode;
  const basePath = createBasePath(mode, submodule);

  const baseOptions: BaseOptions = {
    withCredentials: true,
  };

  if (setToken) {
    const token = Cookies.get("csrf_access_token");

    if (token !== undefined) {
      baseOptions.headers = { "X-CSRF-TOKEN": token };
    }
  }

  return new Configuration({
    basePath: basePath,
    baseOptions,
  });
};

const createBasePath = (mode: Mode, submodule: string) => {
  if (mode === "_local") {
    return import.meta.env.DP_API_PATH.replace("__SUBMODULE__", submodule);
  } else {
    const clientPath = new URL(window.location.href);
    const path = import.meta.env.DP_API_PATH.replace(
      "__HOST__",
      clientPath.host
    ).replace("__SUBMODULE__", submodule);
    return path;
  }
};
