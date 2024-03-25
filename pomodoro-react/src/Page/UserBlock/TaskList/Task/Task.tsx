
import { taskProp } from "../../TaskMaker/TaskMaker"

import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import style from "./task.module.css"
import { Menu } from "./Menu/Menu";
import { TasksContext } from "Page/UserBlock/UserBlock";

export interface ViewTaskProps {
  task: taskProp; 
  onDelete: () => void; 
  setTaskArr: Dispatch<SetStateAction<taskProp[]>>
  onIncrement: () => void;
  onDecrement: () => void; 
}

export function Task({ task, onDelete, setTaskArr,onIncrement, onDecrement}: ViewTaskProps) {
  

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title); 


  const handleUpdate = () => {
    // апдейт списка насильно тут (хотя рост инкремента выше ( в листе) - вынести в одно место )
    const updatedTask: taskProp = { ...task, title: editedTitle };
    setTaskArr((prevTaskArr) => {
      return prevTaskArr.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    });
    console.log("обновление в Task ",updatedTask)
    setIsEditing(false); 
  };
  

  const strokeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(ev.target.value);
   
  };


  return (
    <li className={style.item}>
    <div className={style.pomodoroCount}> {task.count}</div>
    {isEditing ? (
      <input
        type="text"
        value={editedTitle}
        onChange={strokeHandler} 
        onBlur={() => handleUpdate()} 
        autoFocus
      />
    ) : (
      
      <div className={style.title} onDoubleClick={() => setIsEditing(true)}>
        {task.title}
      </div>
    )}
    <Menu
      onDelete={onDelete}
      
      onDecrementCount={onDecrement}
      onIncrementCount={onIncrement}
      rename = {setIsEditing}
    />
  </li>
  );
}
