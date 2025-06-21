import { ReactNode } from "react";

export type ModalSize = "small" | "medium" | "large";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}
