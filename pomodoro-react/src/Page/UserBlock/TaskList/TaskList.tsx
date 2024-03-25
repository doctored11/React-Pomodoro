import React, {  useContext, useEffect } from "react";
import { TasksContext } from "../UserBlock";
import { taskProp } from "../TaskMaker/TaskMaker";
import { Task } from "./Task/Task";

export function TaskList() {
  const { taskArr, setTaskArr } = useContext(TasksContext);

  useEffect(() => {
    console.log("спсок задач обновлен - ", taskArr);
  }, [taskArr]);
  

  return (
    <div>
      {taskArr.map((task) => (
        <Task
          key={task.id}
          task={task}
          setTaskArr={setTaskArr} 
          taskArr={taskArr}
        />
      ))}
    </div>
  );
}
