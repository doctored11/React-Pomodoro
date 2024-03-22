import React, { useContext, useEffect } from "react";
import { TasksContext } from "../UserBlock";
import { TasksContextType } from "../UserBlock";

export function TaskList() {
  const { taskArr, setTaskArr } = useContext(TasksContext);
//   todo еще карточки сюда
  return (
    <div>
      {taskArr.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
