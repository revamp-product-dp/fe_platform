import { generateConfig } from "./config";
import { AccountApi as BaseAccountApi } from "./openapi/api-common";
import type { SigninUser } from "./openapi/api-common";
import Password from "@/helpers/password";

export class SigninApi {
  private getApi() {
    const config = generateConfig("common");
    return new BaseAccountApi(config);
  }

  async signIn(uid: string, pass: string): Promise<SigninUser> {
    const api = this.getApi();
    const password = new Password(pass);
    const res = await api.apiAuthSignin(uid, password.hash(uid));

    return res.data;
  }
}
