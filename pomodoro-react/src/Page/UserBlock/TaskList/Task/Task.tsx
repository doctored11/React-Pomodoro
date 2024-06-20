import { taskProp } from "../../TaskMaker/TaskMaker";
import { useTaskState } from "./useTaskState";

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import style from "./task.module.css";
import { Menu } from "./Menu/Menu";

import { useInputHandler } from "./useInputHandler";

export interface ViewTaskProps {
  task: taskProp;
  setTaskArr: Dispatch<SetStateAction<taskProp[]>>;
  taskArr: taskProp[];
}

export function Task({ task, setTaskArr, taskArr }: ViewTaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { handleChangeCount, handleUpdate, handleDelete, getTaskById } =
    useTaskState({ taskArr, setTaskArr });

  const { editedTitle, handleChange } = useInputHandler(task.title);

  // useEffect(() => {
  //   console.log('LSSet ', taskArr.length)
  //   if (taskArr.length > 0)
  //     localStorage.setItem("Tasks", JSON.stringify(taskArr));
  // }, [taskArr]);

  return (
    <>
      {isDeleting && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>Удалить задачу?</h2>
            <button
              className={style.redBtn}
              onClick={() => {
                handleDelete(task.id);
                setIsDeleting(false);
              }}
            >
              Удалить
            </button>
            <button
              className={style.btn}
              onClick={() => {
                setIsDeleting(false);
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
      <li className={style.item}>
        <div className={style.pomodoroCount}>{task.count - task.stage}</div>

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleChange}
            onBlur={() => {
              handleUpdate({ ...task, title: editedTitle });
              setIsEditing(false);
            }}
            autoFocus
          />
        ) : (
          <div className={style.title} onDoubleClick={() => setIsEditing(true)}>
            {task.title}
          </div>
        )}

        <Menu
          onDelete={() => {
            setIsDeleting(true);
          }}
          onDecrementCount={() => {
            if (task.count > 1) {
              handleChangeCount(task.id, -1);
            } else {
              setIsDeleting(true);
            }
          }}
          onIncrementCount={() => handleChangeCount(task.id, 1)}
          rename={setIsEditing}
          getTask={() => getTaskById(task.id)}
        />
      </li>
    </>
  );
}
