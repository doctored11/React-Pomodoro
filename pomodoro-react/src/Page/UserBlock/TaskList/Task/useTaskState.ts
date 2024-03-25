import { useState, Dispatch, SetStateAction } from 'react';
import { taskProp } from '../../TaskMaker/TaskMaker';

interface UseTaskStateProps {
  taskArr: taskProp[];
  setTaskArr: Dispatch<SetStateAction<taskProp[]>>;
}

export function useTaskState({ taskArr, setTaskArr }: UseTaskStateProps) {
  const handleChangeCount = (taskId: number, count: number) => {
    const updatedTasks = taskArr.map((task) => {
      if (task.id === taskId && task.count+count > 0) {
        return { ...task, count: task.count + count };
      }
      return task;
    });
    setTaskArr(updatedTasks);
  };

  const handleUpdate = (editedTask: taskProp) => {
    const updatedTasks = taskArr.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setTaskArr(updatedTasks);
  };
  const handleDelete = (taskId: number) => {
    const updatedTasks = taskArr.filter((task) => task.id !== taskId);
    setTaskArr(updatedTasks);
  };

  return { handleChangeCount, handleUpdate,handleDelete };
}
