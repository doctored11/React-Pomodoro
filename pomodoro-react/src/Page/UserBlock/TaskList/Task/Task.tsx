
import { taskProp } from "../../TaskMaker/TaskMaker"

import React from "react";
import style from "./task.module.css"

export interface ViewTaskProps {
  task: taskProp; 
  onDelete: () => void; 
  onUpdate: (updatedTask: taskProp) => void; 
}

export function Task({ task, onDelete, onUpdate }: ViewTaskProps) {
  

  
  const handleUpdate = () => {
   
    const updatedTask: taskProp = { ...task, title : "000" };
    onUpdate(updatedTask);
  };

  return (
    <li className={style.item}>
      <div className={style.pomodoroCount}> {task.count}</div>
      <div className={style.title}> {task.title}</div>
      {/* <button onClick={onDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button> */}
      {/* тут будет иконка Menu а в ней DropDown в который надо передать функции изменения и удаления */}
    </li>
  );
}
