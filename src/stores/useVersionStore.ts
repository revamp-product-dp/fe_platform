import { defineStore } from "pinia";

export const useVersionStore = defineStore("VersionStore", {
  state: () => ({
    _version: "",
  }),
  getters: {
    version(state) {
      return state._version;
    },
  },
  actions: {
    setVersion(version: string) {
      this._version = version;
    },
  },
});
