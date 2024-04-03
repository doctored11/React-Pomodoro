import * as React from "react";
import styles from "./dropItemIco.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

interface DropItemIcoProps {
  children: React.ReactNode;
  text: string;
  specialClass?: string;
  onClick?: ((taskId?: number) => void) | ((updatedTask?: taskProp | null) => void);
}

const NOOP = () => {};

export function DropItemIco({
  children,
  text,
  
  onClick = NOOP,
}: DropItemIcoProps) {
  const handleClick = () => {
    onClick();
  };

  const block = (
    <div className={`${styles.dropItem}`} onClick={handleClick}>
      <div className={styles.dropSvgBlock}>{children}</div>

      <div className={styles.dropContentBlock}>
        <p className={styles.dropContent}>{text}</p>
      </div>
    </div>
  );

  return block;
}
