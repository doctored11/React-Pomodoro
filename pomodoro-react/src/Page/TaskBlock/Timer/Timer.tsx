import React, { useState, useEffect } from "react";
import styles from "./timer.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

interface TimerProps {
  taskArr: taskProp[];
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>;
}

export function Timer({ taskArr, setTaskArr }: TimerProps) {
  const timeForPomodor = 5; //пока 60 сек на таск
  const pauseTime = 10;

  const [isRunning, setIsRunning] = useState(false);
  const [isPomodorDone, setPomodorStatus] = useState(false);
  const [seconds, setSeconds] = useState(timeForPomodor);

  //   Todo - разобраться с логикой по тз у помодоро

  function pomodorFinished() {
    const task: taskProp = getActiveTask();
    const updatedTaskArr = [...taskArr];
    task.count -= 1;
    setPomodorStatus(true);

    updatedTaskArr.splice(0, 1, task);
    if (task.count <= 0) {
      taskFinished(task);
    } else {
      setTaskArr(updatedTaskArr);
      handleStartStop();
    }

    return 0;
  }

  function taskFinished(task: taskProp) {
    const updatedTaskArr = [...taskArr];
    task.task_finished = true;
    updatedTaskArr.splice(0, 1, task); // надо в какой то момент удалять те что выполнены ( и давать помидоры):при переключении таймера
    setTaskArr(updatedTaskArr);
    handleStartStop();

    return 0;
  }

  function getActiveTask() {
    //Todo - сделать номрмальным ( получать первый несделанный)
    const updatedTaskArr = [...taskArr];

    const task: taskProp = updatedTaskArr[0];
    return task;
  }

  useEffect(() => {
    let timerID: NodeJS.Timeout;
    setSeconds(isPomodorDone ? pauseTime : timeForPomodor);

    if (isRunning && !isPomodorDone) { //нужна логика за окончание таска и помидора
      timerID = setInterval(() => {
        setSeconds((prevSeconds) =>
          prevSeconds <= 0 ? pomodorFinished() : prevSeconds - 1
        );
      }, 1000);
    }
    

    return () => clearInterval(timerID);
  }, [isRunning]);

  function handleStartStop() {
    if (!getActiveTask()) return;

    setIsRunning(!isRunning);
  }

  function handleReset() {
    const task = getActiveTask();
    setSeconds(timeForPomodor);
    setIsRunning(false);
  }

  return (
    <div>
      <div className={styles.timer}>{seconds}</div>
      <button
        className={`${styles.btn} ${styles.btnTarget}`}
        onClick={handleStartStop}
      >
        {isRunning ? "Пауза" : "Старт"}
      </button>
      <button className={styles.btn} onClick={handleReset}>
        Стопъ
      </button>
    </div>
  );
}
