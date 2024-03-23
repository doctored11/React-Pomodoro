import React, { useContext, useEffect } from "react";
import { TasksContext } from "../UserBlock";
import { taskProp } from "../TaskMaker/TaskMaker";
import { Task } from "./Task/Task";

export function TaskList() {
  const { taskArr, setTaskArr } = useContext(TasksContext);

  const handleDelete = (taskId: number) => {
    const updatedTasks = taskArr.filter((task) => task.id != taskId);
    setTaskArr(updatedTasks);
  };
// передать 
  const handleUpdate = (updatedTask: taskProp) => {
    const updatedTasks = taskArr.map((task) => {
      return task = task.id == updatedTask.id ? updatedTask : task;
    });
    setTaskArr(updatedTasks);
  };

  return (
    <div>
      {taskArr.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={() => handleDelete(task.id)}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
