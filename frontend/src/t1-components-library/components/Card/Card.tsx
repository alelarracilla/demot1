import React from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { CardProps } from "./types";
import { trackComponentInteraction } from "../tracking";

export const Card: React.FC<CardProps> = ({
  image,
  header,
  body,
  footer,
  borderStyle = "default",
}) => {
  const cardClass = classNames(styles.card, styles[`card--${borderStyle}`]);

  const handleClick = () => {
    trackComponentInteraction({
      name: "Card",
      variant: borderStyle,
      action: "click",
    });
  };

  return (
    <div className={cardClass} onClick={handleClick}>
      {image && (
        <img src={image} alt="Card image" className={styles["card-image"]} />
      )}
      {header && <div className={styles["card-section"]}>{header}</div>}
      {body && <div className={styles["card-section"]}>{body}</div>}
      {footer && <div className={styles["card-section"]}>{footer}</div>}
    </div>
  );
};
