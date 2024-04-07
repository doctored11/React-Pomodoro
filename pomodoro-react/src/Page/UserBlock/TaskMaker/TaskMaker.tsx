import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./task.maker.module.css";
import { TasksContext } from "../../Page";

export interface taskProp {
  id: number;
  title: string;
  count: number;
  stage:number;
  in_doing:boolean;
  edit: boolean;
  task_finished: boolean;

}
// вынести хук добавления задачи
export function TaskMaker() {
  const { taskArr, setTaskArr } = useContext(TasksContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [stroke, setStroke] = useState("");
  const [isValid, setValidStatus] = useState(false);

  useEffect(() => {
    setValidStatus(stroke.length > 2);
  }, [stroke]);

  const strokeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setStroke(ev.target.value);
  };

  const addTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) return; 

    const newTask: taskProp = {
      id: taskArr.length + Date.now(),
      title: stroke,
      count: 1,
      stage:0,
      in_doing:false,
      edit: false,
      task_finished: false,
    };
    setTaskArr([...taskArr, newTask]);
    console.log([...taskArr, newTask])
    setStroke("");
  };
  

  return (
    <form className={styles.from} onSubmit={addTask}>
      <input
        className={styles.input}
        onChange={strokeHandler}
        type="text"
        ref={inputRef}
        value={stroke}
      />
      <button disabled={!isValid} className={styles.btn} type="submit">
        Добавить
      </button>
    </form>
  );
}
