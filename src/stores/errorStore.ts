import { defineStore } from "pinia";

type Error = {
  code: number | string | null;
  message: string;
};

export const useErrorStore = defineStore("ErrorStore", {
  state: () => ({
    _error: {
      code: null,
      message: "",
    } as Error,
  }),
  getters: {
    error(state) {
      return state._error;
    },
  },
  actions: {
    init() {
      this._error = {
        code: null,
        message: "",
      };
    },
    setError(code: number | string | null, message: string) {
      this._error = {
        code: code,
        message: message,
      };
    },
  },
});
