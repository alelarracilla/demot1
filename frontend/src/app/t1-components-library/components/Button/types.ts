import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "default" | "secondary" | "danger";
export type ButtonState = "default" | "loading" | "disabled";

export interface ButtonPropTypes
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  state?: ButtonState;
  icon?: ReactNode;
  children: ReactNode;
}
