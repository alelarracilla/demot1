import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { ModalProps } from "./types";
import { trackComponentInteraction } from "../tracking";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = "medium",
  header,
  body,
  footer,
}) => {
  useEffect(() => {
    if (isOpen) {
      trackComponentInteraction({
        name: "Modal",
        variant: size,
        action: "open",
      });
    }
  }, [isOpen, size]);

  if (!isOpen) return null;

  const modalClass = classNames(styles.modal, styles[`modal--${size}`]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={modalClass}>
        {header && (
          <div className={styles["modal-header"]}>
            <div>{header}</div>
            <button className={styles["close-button"]} onClick={onClose}>
              &times;
            </button>
          </div>
        )}
        {body && <div className={styles["modal-body"]}>{body}</div>}
        {footer && <div className={styles["modal-footer"]}>{footer}</div>}
      </div>
    </div>
  );
};
