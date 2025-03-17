import { defineStore } from "pinia";

type Authority = "none" | "only-ref" | "updatable" | "approvable";

type Authorities = {
  menu_cd: string;
  value: Authority;
};

type AuthorityType = {
  id: string;
  name: string;
  authorities: Authorities[];
};

interface Account {
  __id: string;
  __name: string;
  __mailAddress: string;
  __authority_type: AuthorityType;
  __gs_authority_type: string;
  __pageAuthority: { value: string; isUpdatable: boolean };
}

export const useAccountStore = defineStore("AccountStore", {
  state: (): Account => ({
    __id: "",
    __name: "",
    __mailAddress: "",
    __authority_type: { id: "", name: "", authorities: [] },
    __gs_authority_type: "",
    __pageAuthority: { value: "", isUpdatable: false },
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
    hasPermission(state: Account) {
      return (authority_type: string): boolean => {
        return true;
      };
    },
    pageAuthority(state: Account): { value: ""; isUpdatable: boolean } {
      return state.__pageAuthority;
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
      this.__authority_type = param.authority_type;
    },
    clear(): void {
      this.__id = "";
      this.__name = "";
      this.__mailAddress = "";
      this.__authority_type = { menu_cd: "", value: "" };
    },
    setPageAuthority(authorityType: string, isUpdatable: boolean): void {
      this.__pageAuthority = { value: authorityType, isUpdatable: isUpdatable };
    },
  },
  // persist: {
  //   enabled: true,
  // },
});
