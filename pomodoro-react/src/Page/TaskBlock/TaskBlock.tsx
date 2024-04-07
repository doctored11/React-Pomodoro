import React, { useContext, useEffect, useState } from "react";
import { TaskHeader } from "./TaskHeader/TaskHeader";
import { TasksContext } from "../Page";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import { Timer } from "./Timer/Timer";

export function TaskBlock() {
  const { taskArr, setTaskArr } = useContext(TasksContext);

  const block = (
    <div>
      <TaskHeader task={taskArr[0]}></TaskHeader>
      <Timer taskArr={taskArr} setTaskArr={setTaskArr}></Timer>
    </div>
  );

  return block;
}
