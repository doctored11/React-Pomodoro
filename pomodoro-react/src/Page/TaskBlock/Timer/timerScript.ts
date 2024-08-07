import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import { useTaskState } from "../../UserBlock/TaskList/Task/useTaskState";
import { Statistic } from "Page/Statistic/Statistic";
import { StatisticTool } from "../../../utils/localStorageUtils";

export function handleTimer(
  seconds: number,
  isPomodoroDone: boolean,
  setPomodoroDone: Dispatch<SetStateAction<boolean>>,
  handleStartStop: Function,
  taskArr: taskProp[],
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>,
  handleDelete: (taskId: number) => void,
  toggleInProcess: () => void
) {
  if (seconds <= 0) {
    if (isPomodoroDone) {
      setPomodoroDone(false);
      handleStartStop();
      toggleInProcess();
      return 0;
    } else {
      pomodorFinished(
        taskArr,
        setTaskArr,
        setPomodoroDone,
        handleDelete,
        handleStartStop,
        toggleInProcess
      );
      return 0;
    }
  } else {
    return seconds - 1;
  }
}

export function handleTaskFinished(
  task: taskProp,
  handleDelete: Function,
  handleStartStop: Function
) {
  if (task.stage >= task.count) {
    task.task_finished = true;

    handleDelete(task.id);

    handleStartStop();
  }
  return 0;
}
export function handleTimePlus(seconds: number, timeToAdd: number): number {
  const updatedSeconds = seconds + timeToAdd;
  return updatedSeconds;
}

export function getActiveTask(Arr: taskProp[]) {
  const updatedTaskArr = [...Arr];
  const task: taskProp = updatedTaskArr[0];
  return task;
}
export function reduceTaskCount(task: taskProp): void {
  task.count -= 1;
}
export function stageUp(task: taskProp): void {
  task.stage += 1;
  task.in_doing = false;
}
export function setPomodoroInDoing(
  task: taskProp,
  handleSetInDoing: Function
): void {
  if (!task) return;
  handleSetInDoing(task.id, true);
}

//
//
//
export function pomodorFinished(
  taskArr: taskProp[],
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>,
  setPomodoroDone: React.Dispatch<React.SetStateAction<boolean>>,
  handleDelete: Function,
  handleStartStop: Function,
  toggleInProcess: Function
) {
  console.log('pom done')
  if (!taskArr || taskArr.length < 1) return -1;
  const task: taskProp = getActiveTask(taskArr);
  const updatedTaskArr = [...taskArr];

  stageUp(task);
  StatisticTool.setPomodoreDone();
  setPomodoroDone(true);
  updatedTaskArr.splice(0, 1, task);

  if (task.stage >= task.count) {
    console.log("taskStatus 1")
    handleTaskFinished(task, handleDelete, handleStartStop);
  } else {
    console.log("taskStatus 2")
    setTaskArr(updatedTaskArr);
    handleStartStop();
  }
  toggleInProcess();

  return 0;
}
