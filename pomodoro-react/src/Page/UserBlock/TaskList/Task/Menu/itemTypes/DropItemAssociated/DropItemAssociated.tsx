import * as React from "react";
import styles from "./dropItem.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

interface DropItemAssociatedProps {
  children: React.ReactNode;
  text: string;
  specialClass?: string;

  onClick?: () => void;
}

const NOOP = () => {};

export function DropItemAssociated({
  children,
  text,
  specialClass = "",
  onClick = NOOP,
}: DropItemAssociatedProps) {
  return (
    <div className={`${styles.dropItem} styles.${specialClass}`}>
      <div className={styles.dropSvgBlock}>{children}</div>
      <div className={styles.dropContentBlock}>
        <button className={styles.dropContent} onClick={onClick}>
          {text}
        </button>
      </div>
    </div>
  );
}
