import { InputHTMLAttributes } from "react";

export type InputType = "text" | "email" | "password";
export type InputState = "default" | "error" | "success";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  state?: InputState;
  label?: string;
}
