import { useContext } from "react";
import { TasksContext } from "../../../Page";
import { taskProp } from "../../TaskMaker/TaskMaker";

interface UseTaskStateProps {
  taskArr: taskProp[];
  setTaskArr: React.Dispatch<React.SetStateAction<taskProp[]>>;
}

export function useTaskState({ taskArr, setTaskArr }: UseTaskStateProps) {
  const handleChangeCount = (taskId: number, count: number) => {
    const updatedTasks = taskArr.map((task) => {
      if (task.id === taskId && task.count + count > 0) {
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

  const getTaskById = (taskId: number): taskProp | null => {
    const foundTask = taskArr.find((task) => task.id === taskId);
    console.log("нАйден таск, ", foundTask)
    return foundTask ?? null;
  };
  

  const handleDelete = (taskId: number) => {
    const updatedTasks = taskArr.filter((task) => task.id !== taskId);
    setTaskArr(updatedTasks);
  };


  const handleSetInDoing = (taskId: number, inDoing: boolean) => {
    const updatedTasks = taskArr.map((task) => {
      if (task.id === taskId) {
        return { ...task, in_doing: inDoing };
      }
      return task;
    });
    setTaskArr(updatedTasks);
  };

  return {
    handleChangeCount,
    handleUpdate,
    handleDelete,
    handleSetInDoing,
    taskArr,
    setTaskArr,
    getTaskById,
  };
}
