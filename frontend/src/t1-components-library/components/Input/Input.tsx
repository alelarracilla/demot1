import classNames from "classnames";
import styles from "./Input.module.scss";
import { InputProps } from "./types";
import { trackComponentInteraction } from "../tracking";

export const Input: React.FC<InputProps> = ({
  type = "text",
  state = "default",
  label,
  disabled,
  onFocus,
  ...props
}) => {
  const inputClass = classNames(styles.input, {
    [styles["input--error"]]: state === "error",
    [styles["input--success"]]: state === "success",
    [styles["input--disabled"]]: disabled,
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!disabled) {
      trackComponentInteraction({
        name: "Input",
        variant: type,
        action: "focus",
      });
    }

    onFocus?.(e);
  };

  return (
    <div className={styles["input-wrapper"]}>
      {label && <label className={styles["input-label"]}>{label}</label>}
      <input
        type={type}
        className={inputClass}
        disabled={disabled}
        onFocus={handleFocus}
        {...props}
      />
    </div>
  );
};
