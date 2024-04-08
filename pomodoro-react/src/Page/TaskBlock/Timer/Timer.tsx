import React, { useState, useEffect, useCallback } from "react";
import styles from "./timer.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import {
  getActiveTask,

  handleTaskFinished,
  handleTimer,
  setPomodoroInDoing,
  stageUp,
} from "./timerScript";
import { useTaskState } from "../../UserBlock/TaskList/Task/useTaskState";
import { useTimerHooks } from "./timerHooks";

const POMODORO_DURATION = 0.3 * 60;
const SHORT_BREAK_DURATION = 0.1 * 60;
const LONG_BREAK_DURATION = 2 * 60;
const POMODORO_COUNT_TO_LONG_BREAK = 4;

interface TimerProps {
  taskArr: taskProp[];
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>;
}

export function Timer({ taskArr, setTaskArr }: TimerProps) {
  const { handleDelete, handleSetInDoing } = useTaskState({
    taskArr,
    setTaskArr,
  });
  //так, отделаить состояние таймера от таска ( пауза или помидор - не зависимо от таска)
  // что то придумать с большим кол вом пропсов

  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoroDone, setPomodoroDone] = useState(false);
  const [seconds, setSeconds] = useState(POMODORO_DURATION);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const { handleStartStop, handleReset } = useTimerHooks({
    taskArr,
    setTaskArr,
    isRunning,
    setIsRunning,
    isPomodoroDone,
    setPomodoroDone,
    seconds,
    setSeconds,
    pomodoroCount,
    setPomodoroCount,
  });




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
      <button
        className={styles.btn}
        onClick={() =>
        console.log("пусто пока⚠️")
        }
      >
        Сброс
      </button>
    </div>
  );
}
