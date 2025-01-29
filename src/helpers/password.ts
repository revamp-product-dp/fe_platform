import ripemd160 from "crypto-js/ripemd160";
import sha512 from "crypto-js/sha512";

const STRETCH_COUNT = 3;

class Password {
  private _pass: string;

  constructor(pass: string) {
    this._pass = pass;
  }

  hash(salt: string): string {
    let hash = this._pass;
    const _salt = ripemd160(salt).toString();
    for (let i = 0; i < STRETCH_COUNT; i++) {
      hash = sha512(hash + _salt).toString();
    }
    return hash;
  }
}

export default Password;
