import { generateConfig } from "./config";
import { AccountApi as BaseAccountApi } from "./openapi/api-common";
import { PageApi as BasePageApi } from "./openapi/api-common";
import type { SigninUser, ActiveService } from "./openapi/api-common";
import Password from "@/helpers/password";

export type { SigninUser, ActiveService };

export class AccountApi {
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

  async signOut(xCsrfToken: string): Promise<void> {
    const api = this.getApi();
    await api.apiAuthSignout(xCsrfToken);
  }
}

export class PageApi {
  private getApi() {
    const config = generateConfig("common");
    return new BasePageApi(config);
  }

  async getActiveServiceList(): Promise<ActiveService[]> {
    const api = this.getApi();
    const res = await api.pagesActiveServiceListGet();

    return res.data.active_service_list;
  }
}
