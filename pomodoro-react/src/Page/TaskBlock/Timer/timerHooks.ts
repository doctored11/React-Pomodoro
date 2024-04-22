import { useEffect, useCallback } from "react";
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

  function handleStartStop() {
    if (!taskArr.length) {
      setIsRunning(false);
      return;
    }
    setIsRunning(!isRunning);
  }

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setPomodoroDone(false);
    setSeconds(POMODORO_DURATION);
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

  return { handleStartStop, handleReset, handleTimerPlus };
}
