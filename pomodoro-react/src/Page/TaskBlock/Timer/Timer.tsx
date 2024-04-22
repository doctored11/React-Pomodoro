import React, { useState, useEffect, useCallback } from "react";
import styles from "./timer.module.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import {
  getActiveTask,
  handleTaskFinished,
  handleTimer,
  pomodorFinished,
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
  toggleInProcess: () => void;
}
// TODO: связать  toggleInProcess с чем либо ( для уменьшения пропсов и упрощения логики)

export function Timer({ taskArr, setTaskArr, toggleInProcess }: TimerProps) {
  const { handleDelete, handleSetInDoing } = useTaskState({
    taskArr,
    setTaskArr,
  });

  //TODO что то придумать с большим кол вом пропсов

  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoroDone, setPomodoroDone] = useState(false);
  const [seconds, setSeconds] = useState(POMODORO_DURATION);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const { handleStartStop, handleReset, handleTimerPlus } = useTimerHooks({
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
    toggleInProcess,
  });

  // console.log(taskArr)

  const [btnName, setBtnName] = useState("Стоп");
  const [btnCallback, setBtnCallback] = useState(() => handleReset);
  //логика второй кнопки
  useEffect(() => {
    if (taskArr[0]?.in_doing) {
      // это то что мы в задании (помидор)
      if (isRunning) {
        //таймер тикает
        // то СТОП (таймер остановить и вернуть на начальное значение --для выполнения задания сначала)
        setBtnName("Стоп");
        setBtnCallback(() => handleReset);
      } else {
        //то Сделано (помидор сделан)
        console.log("Кнопка в статусе:  Сделанно");
        setBtnName("Сделано");
        setBtnCallback(() => hardPomodorDone);
      }
    } else {
      // это то что мы в перерыве
      // то Пропустить Перерыв
      console.log("Кнопка в статусе:  Пропустить");
      setBtnName("Пропустить");
      setBtnCallback(() => skipPause);
    }
  }, [taskArr, isRunning, isPomodoroDone]);

  // TODO - сделать чтобы визуально помиоры менялись в списке
  function hardPomodorDone() {
    pomodorFinished(
      taskArr,
      setTaskArr,
      setPomodoroDone,
      handleDelete,
      handleStartStop,
      toggleInProcess
    );
  }
  function skipPause() {
    setPomodoroDone(false);
    toggleInProcess();
  }

  return (
    <div className={styles.timerForm}>
      <div className={styles.timer}>
        {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>

      <button className={styles.plusBtn} onClick={handleTimerPlus} />
      <div className={styles.btnsBlock}>
        <button
          className={`${styles.btn} ${styles.btnTarget}`}
          onClick={handleStartStop}
        >
          {isRunning
            ? "Пауза"
            : seconds == POMODORO_DURATION
            ? "Старт"
            : "Продолжить"}
        </button>
        <button className={styles.btn} onClick={() => btnCallback()}>
          {btnName}
        </button>
      </div>
    </div>
  );
}
