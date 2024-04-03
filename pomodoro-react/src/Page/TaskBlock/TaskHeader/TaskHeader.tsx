import React from "react";
import styles from "./taskHeader.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

export function TaskHeader({ task }: { task: taskProp }) {
  // на смене id все будет
  const head = (
    <header className={styles.header}>
      <p className={styles.txt}>Задание (Название) {task?.title + ""}</p>
      <p className={styles.txt}>Стадия (Этап)</p>
    </header>
  );
  return head;
}
