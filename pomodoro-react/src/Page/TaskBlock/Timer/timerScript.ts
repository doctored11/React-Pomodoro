import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import { Dispatch, SetStateAction, useContext } from "react";
import { useTaskState } from "../../UserBlock/TaskList/Task/useTaskState";

export function handleTimer(
  seconds: number,
  isPomodoroDone: boolean,
  setPomodoroDone: Dispatch<SetStateAction<boolean>>,
  pomodorFinished: Function,
  handleStartStop: Function,
  taskArr: taskProp[],
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>
) {
  if (seconds <= 0) {
    if (isPomodoroDone) {
      setPomodoroDone(false);
      handleStartStop();
      return 0;
    } else {
      pomodorFinished();
      return 0;
    }
  } else {
    return seconds - 1;
  }
}

export function handleTaskFinished(
  task: taskProp,
  handleDelete:Function,
  handleStartStop: Function
) {
  if (task.stage >= task.count) {
    task.task_finished = true;

    handleDelete(task.id);

    handleStartStop();
  }
  return 0;
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
export function setPomodoroInDoing(task: taskProp,handleSetInDoing:Function): void {
  if (!task) return;
  handleSetInDoing(task.id, true);
}
