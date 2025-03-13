import { defineStore } from "pinia";

export const useDisableStore = defineStore("DisableStore", {
  state: () => ({
    _isDisabled: false,
  }),
  getters: {
    isDisabled(state) {
      return state._isDisabled;
    },
  },
  actions: {
    init() {
      this.setIsDisabled(false);
    },
    setIsDisabled(isDisabled: boolean) {
      this._isDisabled = isDisabled;
    },
  },
});
