import classNames from "classnames";
import styles from "./Button.module.scss";
import { ButtonPropTypes } from "./types";
import { trackComponentInteraction } from "../tracking";

export const Button: React.FC<ButtonPropTypes> = ({
  variant = "primary",
  state = "default",
  icon,
  children,
  onClick,
  ...props
}) => {
  const isDisabled = state === "disabled" || state === "loading";

  const buttonClass = classNames(styles.button, styles[`button--${variant}`], {
    [styles["button--loading"]]: state === "loading",
    [styles["button--disabled"]]: state === "disabled",
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      trackComponentInteraction({
        name: "Button",
        variant,
        action: "click",
      });
      onClick?.(e);
    }
  };

  return (
    <button
      className={buttonClass}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
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
