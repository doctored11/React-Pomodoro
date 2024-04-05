import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import { Dispatch, SetStateAction } from "react";


export function handleTimer(seconds: number, isPomodoroDone: boolean, setPomodoroDone: Dispatch<SetStateAction<boolean>>, pomodorFinished: Function, handleStartStop: Function) {
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
  
  export function handleTaskFinished(updatedTaskArr: taskProp[], task: taskProp, setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>, handleStartStop: Function) {
    if (task.count <= 0) {
      task.task_finished = true;
      updatedTaskArr.splice(0, 1);
      setTaskArr(updatedTaskArr);
      handleStartStop();
    }
    return 0
  }
  
  export  function getActiveTask(Arr: taskProp[]) {
    const updatedTaskArr = [...Arr];
    const task: taskProp = updatedTaskArr[0];
    return task;
  }
  export function reduceTaskCount(task: taskProp): void {
    task.count -= 1;
  }
  