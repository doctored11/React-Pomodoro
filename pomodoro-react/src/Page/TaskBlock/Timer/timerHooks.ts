import { useEffect, useCallback, useState } from "react";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import {
  handleTimePlus,
  handleTimer,
  handleTaskFinished,
  getActiveTask,
  setPomodoroInDoing,
  stageUp,
} from "./timerScript";
import { useTaskState } from "../../UserBlock/TaskList/Task/useTaskState";
import { StatisticTool } from "../../../utils/localStorageUtils";

const POMODORO_DURATION = 0.3 * 60;
const SHORT_BREAK_DURATION = 0.1 * 60;
const LONG_BREAK_DURATION = 2 * 60;
const POMODORO_COUNT_TO_LONG_BREAK = 4;
const TIME_TO_PLUS = 0.5 * 60;

interface TimerHooksProps {
  taskArr: taskProp[];
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isPomodoroDone: boolean;
  setPomodoroDone: React.Dispatch<React.SetStateAction<boolean>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  pomodoroCount: number;
  setPomodoroCount: React.Dispatch<React.SetStateAction<number>>;
  toggleInProcess: () => void;
}

export function useTimerHooks({
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
}: TimerHooksProps) {
  const { handleDelete, handleSetInDoing } = useTaskState({
    taskArr,
    setTaskArr,
  });
  
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const updateElapsedTime = (newTime: number) => {
    setElapsedTime(newTime);
  };

  function handleStartStop() {
    if (!taskArr.length) {
      setIsRunning(false);
      setElapsedTime(0);
      return;
    }
    setIsRunning(!isRunning);
    if (isRunning) {
      const timeString = String(elapsedTime);
      console.log(elapsedTime)
      StatisticTool.addPauseTime(timeString);
    } else {
      setElapsedTime(0); 
    }
  } 
//  updateElapsedTime - надо адекватно обновлять в простое - сейчас это складывает стариые тайминги в обратном порядке
  const handleReset = useCallback(() => {
    StatisticTool.addPauseCount()
    setIsRunning(false);
    setPomodoroDone(false);
    setSeconds(POMODORO_DURATION);
    setElapsedTime(0);
  }, [setIsRunning, setPomodoroDone, setSeconds]);

  useEffect(() => {
    let timerID: NodeJS.Timeout;
    if (isRunning) {
      timerID = setInterval(() => {
        setSeconds((prevSeconds) =>
          handleTimer(
            prevSeconds,
            isPomodoroDone,
            setPomodoroDone,
            handleStartStop,
            taskArr,
            setTaskArr,
            handleDelete,
            toggleInProcess
          )
        );
        updateElapsedTime(seconds)
      }, 1000);
    }
    return () => clearInterval(timerID);
  }, [isRunning, isPomodoroDone, taskArr]);

  function handleTimerPlus() {

    const newTime = handleTimePlus(seconds, TIME_TO_PLUS);
    setSeconds(newTime);
  }

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
      const task = getActiveTask(taskArr);

      setPomodoroInDoing(task, handleSetInDoing);
    }
  }, [isPomodoroDone]);


  const toggleStartStop = useCallback(() => {
    if (isRunning) {
      // Вычисляем часы, минуты и секунды
      const hours = Math.floor(elapsedTime / 3600);
      const minutes = Math.floor((elapsedTime % 3600) / 60);
      const seconds = elapsedTime % 60;
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return "0:0:0";
    }
  }, [isRunning, elapsedTime]);  

  return { handleStartStop, handleReset, handleTimerPlus, toggleStartStop };
}
