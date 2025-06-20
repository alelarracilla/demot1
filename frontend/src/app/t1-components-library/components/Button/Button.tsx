import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";
import { ButtonPropTypes } from "./types";

const Button: React.FC<ButtonPropTypes> = ({
  variant = "primary",
  state = "default",
  icon,
  children,
  ...props
}) => {
  const isDisabled = state === "disabled" || state === "loading";

  const buttonClass = classNames(styles.button, styles[`button--${variant}`], {
    [styles["button--loading"]]: state === "loading",
    [styles["button--disabled"]]: state === "disabled",
  });

  return (
    <button className={buttonClass} disabled={isDisabled} {...props}>
      {state === "loading" ? (
        "Loading..."
      ) : (
        <>
          {icon && <span className={styles["button__icon"]}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
