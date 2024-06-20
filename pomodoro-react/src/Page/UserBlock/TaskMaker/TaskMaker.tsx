import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./task.maker.module.css";
import { TasksContext } from "../../Page";

export interface taskProp {
  id: number;
  title: string;
  count: number;
  stage: number;
  in_doing: boolean;
  edit: boolean;
  task_finished: boolean;
}

export function TaskMaker() {
  const { taskArr, setTaskArr } = useContext(TasksContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [stroke, setStroke] = useState("");
  const [isValid, setValidStatus] = useState(false);

  useEffect(() => {
    setValidStatus(stroke.length > 2);
  }, [stroke]);

  useEffect(() => {
    if(taskArr.length>0)
     localStorage.setItem("Tasks", JSON.stringify(taskArr));
  }, [taskArr]);

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
      stage: 0,
      in_doing: taskArr.length > 0 ? false : true,
      edit: false,
      task_finished: false,
    };
    setTaskArr([...taskArr, newTask]);
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
