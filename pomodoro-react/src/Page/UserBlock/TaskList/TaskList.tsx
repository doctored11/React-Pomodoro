import React, { useContext, useEffect } from "react";
import { TasksContext } from "../UserBlock";
import { taskProp } from "../TaskMaker/TaskMaker";
import { Task } from "./Task/Task";

export function TaskList() {
  const { taskArr, setTaskArr } = useContext(TasksContext);

  const handleDelete = (taskId: number) => {
    const updatedTasks = taskArr.filter((task) => task.id !== taskId);
    setTaskArr(updatedTasks);
  };

  
  useEffect(() => {
    
    console.log("спсок задач обновлен - ", taskArr);
  }, [taskArr]);
  

  const handleIncrement = (taskId: number) => {
    const updatedTasks = taskArr.map((task) => {
      if (task.id === taskId) {
        return { ...task, count: task.count + 1 };
      }
      return task;
    });
    setTaskArr(updatedTasks);
  };

  const handleDecrement = (taskId: number) => {
    const updatedTasks = taskArr.map((task) => {
      if (task.id === taskId && task.count > 0) {
        return { ...task, count: task.count - 1 };
      }
      return task;
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
          setTaskArr={setTaskArr} 
          onIncrement={() => handleIncrement(task.id)}
          onDecrement={() => handleDecrement(task.id)}
        />
      ))}
    </div>
  );
}
