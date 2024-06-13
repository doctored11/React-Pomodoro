import React, { useState, useEffect, useRef } from "react";
import { Header } from "./Header/Header";
import { UserBlock } from "./UserBlock/UserBlock";
import styles from "./page.module.css";
import { TaskBlock } from "./TaskBlock/TaskBlock";
import { taskProp } from "./UserBlock/TaskMaker/TaskMaker";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export interface TasksContextType {
  taskArr: taskProp[];
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>;
}

export const TasksContext = React.createContext<TasksContextType>({
  taskArr: [],
  setTaskArr: () => {},
});

export function Page() {
  const [taskArr, setTaskArr] = useState<taskProp[]>([]);

  return (

    <>
      <TasksContext.Provider value={{ taskArr, setTaskArr }}>
        {/* <Header></Header> */}
        <div className={"frame"}>
          <div className={styles.userBlockFrame}>
            <UserBlock></UserBlock>
          </div>
          <div className={styles.taskBlockFrame}>
            <TaskBlock></TaskBlock>
          </div>
        </div>{" "}
      </TasksContext.Provider>
    </>
   
 
  );
}
