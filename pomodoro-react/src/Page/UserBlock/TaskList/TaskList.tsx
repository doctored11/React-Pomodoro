import React, {  useContext, useEffect } from "react";

import { taskProp } from "../TaskMaker/TaskMaker";
import { Task } from "./Task/Task";
import { TasksContext } from "../../Page";

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
