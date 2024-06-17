import React, { useContext, useEffect } from "react";

import { taskProp } from "../TaskMaker/TaskMaker";
import { Task } from "./Task/Task";
import { TasksContext } from "../../Page";
import style from "./taskList.module.css";
import { GeneralTimer } from "./GeneralTimer/GeneralTimer";

export function TaskList() {
  const { taskArr, setTaskArr } = useContext(TasksContext);

  useEffect(() => {
    const item = localStorage.getItem("Tasks");
    const savedTasks = item ? JSON.parse(item) : [];
    setTaskArr(savedTasks);
  }, [setTaskArr]);

  useEffect(() => {
    if (taskArr.length > 0) {
      localStorage.setItem("Tasks", JSON.stringify(taskArr));
    }
  }, [taskArr]);
  return (
    <>
      <div className={style.list}>
        {taskArr.map((task) => (
          <Task
            key={task.id}
            task={task}
            setTaskArr={setTaskArr}
            taskArr={taskArr}
          />
        ))}
      </div>{" "}
      <GeneralTimer taskArr={taskArr}></GeneralTimer>
    </>
  );
}
