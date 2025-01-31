import { requireValidate } from "./require";
import { emailValidate } from "./email";

export type Rule = (val: string | null) => string | true;

export const required = requireValidate;
export const email = emailValidate;
