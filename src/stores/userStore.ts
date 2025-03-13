import { defineStore } from "pinia";

interface UserState {
  id: string;
  name: string;
  mailAddress: string;
}

export const useUserStore = defineStore("UserStore", {
  state: (): UserState => ({
    id: "",
    name: "",
    mailAddress: "",
  }),

  getters: {
    userInfo: (state): UserState => {
      return {
        id: state.id,
        name: state.name,
        mailAddress: state.mailAddress,
      };
    },
  },

  actions: {
    setId(newId: string) {
      this.id = newId;
    },
    setname(newName: string) {
      this.name = newName;
    },
    setMailAddress(newMail: string) {
      this.mailAddress = newMail;
    },
    setUserInfo({ id, name, mailAddress }: Partial<UserState>) {
      id && (this.id = id);
      name && (this.name = name);
      mailAddress && (this.mailAddress = mailAddress);
    },
  },
});
