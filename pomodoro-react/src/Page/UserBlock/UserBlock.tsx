import React, { useState } from "react";
import { Manual } from "./Manual/Manual";
import styles from "./userBlock.module.css";
import { TaskMaker } from "./TaskMaker/TaskMaker";
import { taskProp } from "./TaskMaker/TaskMaker";
import { TaskList } from "./TaskList/TaskList";

export interface TasksContextType {
  taskArr: taskProp[];
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>;
}
export const TasksContext = React.createContext<TasksContextType>({
  taskArr: [],
  setTaskArr: () => {},
});

export function UserBlock() {
  const [taskArr, setTaskArr] = useState<taskProp[]>([]);
  const block = (
    <div className={styles.userBlock}>
      <TasksContext.Provider value={{ taskArr, setTaskArr }}>
        <Manual></Manual>
        <TaskMaker></TaskMaker>
        <TaskList></TaskList>
      </TasksContext.Provider>
    </div>
  );
  return block;
}
