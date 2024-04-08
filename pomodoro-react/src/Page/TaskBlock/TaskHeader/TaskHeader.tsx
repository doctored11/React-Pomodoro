import React, { useEffect } from "react";
import styles from "./taskHeader.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

export function TaskHeader({ task, isInProcess }: { task: taskProp; isInProcess: boolean }) {

  // на смене id все будет

  useEffect(() => {
    console.log("task.in_doing:", task?.in_doing);
  }, [task]);
  const head = (
    <header className={styles.header}>
      {" "}
      {task && (
        <>
          <p className={styles.txt}>Задание {task.title}</p>
          <p className={styles.txt}>{isInProcess ? "Помидор "+ task.stage : "Перерыв"}</p>
        </>
      )}{" "}
    </header>
  );
  return head;
}
