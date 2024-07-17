import React, { useState } from "react";
import { Manual } from "./Manual/Manual";
import styles from "./userBlock.module.css";
import { TaskMaker } from "./TaskMaker/TaskMaker";
import { taskProp } from "./TaskMaker/TaskMaker";
import { TaskList } from "./TaskList/TaskList";

export function UserBlock() {
  const block = (
    <div className={styles.userBlock}>
      <Manual ></Manual>
      <TaskMaker></TaskMaker>
      <TaskList></TaskList>
    </div>
  );
  return block;
}
