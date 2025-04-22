import { defineStore } from "pinia";
import type { Account as ApiAccount } from "@/api-clients/openapi/api-common";

interface Account {
  __id: string;
  __name: string;
  __mailAddress: string;
  __isAdministrator: boolean;
  __isSuperAdministrator: boolean;
  __langCd: string;
}

export const useAccountStore = defineStore("AccountStore", {
  state: (): Account => ({
    __id: "",
    __name: "",
    __mailAddress: "",
    __isAdministrator: false,
    __isSuperAdministrator: false,
    __langCd: "",
  }),
  getters: {
    id(state: Account): string {
      return state.__id;
    },
    name(state: Account): string {
      return state.__name;
    },
    mailAddress(state: Account): string {
      return state.__mailAddress;
    },
    isAdministrator(state: Account): boolean {
      return state.__isAdministrator;
    },
    isSuperAdministrator(state: Account): boolean {
      return state.__isSuperAdministrator;
    },
    langCd(state: Account): string {
      return state.__langCd;
    },

    // isAuthenticated(state): boolean {
    //   // Cookie参照してチェック
    //   return true;
    // },
  },
  actions: {
    set(param: ApiAccount): void {
      this.__id = param.id;
      this.__name = param.name;
      this.__mailAddress = param.mail_address;
      this.__isAdministrator = param.is_administrator;
      this.__isSuperAdministrator = param.is_super_administrator;
      this.__langCd = param.lang_cd ?? "";
    },
    clear(): void {
      this.__id = "";
      this.__name = "";
      this.__mailAddress = "";
      this.__isAdministrator = false;
      this.__isSuperAdministrator = false;
      this.__langCd = "";
    },
  },
  // persist: {
  //   enabled: true,
  // },
});
