import React, { useState, useEffect } from "react";
import styles from "./timer.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

interface TimerProps {
  taskArr: taskProp[];
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>;
}

export function Timer({ taskArr, setTaskArr }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoroDone, setPomodoroDone] = useState(false);

  const pomodoroDuration = 0.3 * 60;
  const shortBreakDuration = 0.1 * 60;
  const longBreakDuration = 2 * 60;
  const pomodoroCountToLongBreak = 4;

  const [seconds, setSeconds] = useState(pomodoroDuration);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  function pomodorFinished(taskArr: taskProp[]) {
    const task: taskProp = getActiveTask(taskArr);
    const updatedTaskArr = [...taskArr];
    task.count -= 1;
    setPomodoroDone(true);

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
    if (updatedTaskArr[0].count <= 0) {
      console.log("tf, " + updatedTaskArr);
      task.task_finished = true;
      updatedTaskArr.splice(0, 1);
      setTaskArr(updatedTaskArr);
      handleStartStop();
    }

    return 0;
  }

  function getActiveTask(Arr: taskProp[]) {
    //Todo - сделать номрмальным ( получать первый несделанный)
    const updatedTaskArr = [...Arr];

    const task: taskProp = updatedTaskArr[0];
    return task;
  }

  useEffect(() => {
    let timerID: NodeJS.Timeout;

    if (isRunning ) {
      timerID = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 0) {
            if (isPomodoroDone) {
              setPomodoroDone(false);
              handleStartStop();
              return 0;
            } else {
              pomodorFinished(taskArr);
              return 0;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }
    
    return () => clearInterval(timerID);
  }, [isRunning, isPomodoroDone, taskArr]);

  useEffect(() => {
    console.log("-__ " + isPomodoroDone);
    if (isPomodoroDone) {
      setPomodoroCount(pomodoroCount + 1);
      if (pomodoroCount == pomodoroCountToLongBreak) {
        setSeconds(longBreakDuration);
      } else {
        setSeconds(shortBreakDuration);
      }
      // setPomodoroDone(false);
    } else {
      setSeconds(pomodoroDuration);
    }
  }, [isPomodoroDone]);

  function handleStartStop() {
    if (!taskArr.length) return;

    setIsRunning(!isRunning);
  }

  function handleReset() {
    setIsRunning(false);
    setPomodoroDone(false);
    setPomodoroCount(0);
    setSeconds(pomodoroDuration);
  }

  return (
    <div>
      <div className={styles.timer}>
        {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
      <button
        className={`${styles.btn} ${styles.btnTarget}`}
        onClick={handleStartStop}
      >
        {isRunning ? "Пауза" : "Старт"}
      </button>
      <button className={styles.btn} onClick={handleReset}>
        Сброс
      </button>
    </div>
  );
}
