import React from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  type = "text",
  state = "default",
  label,
  disabled,
  ...props
}) => {
  const inputClass = classNames(styles.input, {
    [styles["input--error"]]: state === "error",
    [styles["input--success"]]: state === "success",
    [styles["input--disabled"]]: disabled,
  });

  return (
    <div className={styles["input-wrapper"]}>
      {label && <label className={styles["input-label"]}>{label}</label>}
      <input
        type={type}
        className={inputClass}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default Input;
