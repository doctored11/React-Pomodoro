import React, { useState, useEffect, useCallback } from "react";
import styles from "./timer.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import { getActiveTask, handleTaskFinished, handleTimer, reduceTaskCount } from "./timerScript";

// timerConstants.ts
const POMODORO_DURATION = 0.3 * 60;
const SHORT_BREAK_DURATION = 0.1 * 60;
const LONG_BREAK_DURATION = 2 * 60;
const POMODORO_COUNT_TO_LONG_BREAK = 4;

interface TimerProps {
  taskArr: taskProp[];
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>;
}

export function Timer({ taskArr, setTaskArr }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoroDone, setPomodoroDone] = useState(false);
  const [seconds, setSeconds] = useState(POMODORO_DURATION);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  function pomodorFinished() {
    if (!taskArr || taskArr.length < 1) return -1;
    const task: taskProp = getActiveTask(taskArr);
    const updatedTaskArr = [...taskArr];

    reduceTaskCount(task);
    setPomodoroDone(true);
    updatedTaskArr.splice(0, 1, task);

    if (task.count <= 0) {
      handleTaskFinished(taskArr, task, setTaskArr, handleStartStop);
    } else {
      setTaskArr(updatedTaskArr);
      handleStartStop();
    }

    return 0;
  }

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setPomodoroDone(false);
    setPomodoroCount(0);
    setSeconds(POMODORO_DURATION);
  }, []);

  useEffect(() => {
    let timerID: NodeJS.Timeout;
    if (isRunning) {
      timerID = setInterval(() => {
        setSeconds((prevSeconds) =>
          handleTimer(
            prevSeconds,
            isPomodoroDone,
            setPomodoroDone,
            pomodorFinished,
            handleStartStop
          )
        );
      }, 1000);
    }
    return () => clearInterval(timerID);
  }, [isRunning, isPomodoroDone, taskArr]);

  useEffect(() => {
    if (isPomodoroDone) {
      setPomodoroCount(pomodoroCount + 1);
      setSeconds(
        pomodoroCount === POMODORO_COUNT_TO_LONG_BREAK
          ? LONG_BREAK_DURATION
          : SHORT_BREAK_DURATION
      );
    } else {
      setSeconds(POMODORO_DURATION);
    }
  }, [isPomodoroDone]);

  function handleStartStop() {
    if (!taskArr.length) return;
    setIsRunning(!isRunning);
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
