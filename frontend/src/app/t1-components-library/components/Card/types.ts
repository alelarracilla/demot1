import { ReactNode } from "react";

export type CardBorderStyle = 'default' | 'rounded' | 'outlined';

export interface CardProps {
  image?: string;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  borderStyle?: CardBorderStyle;
}
