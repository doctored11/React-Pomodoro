import * as React from "react";
// import "./menu.css";
import { DropDown } from "./DropDown/DropDown";
import { DropItemIco } from "./itemTypes/DropItemIco/DropItemIco";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import { DropItemAssociated } from "./itemTypes/DropItemAssociated/DropItemAssociated";

export interface TaskMenuProps {
  onDelete: () => void;
  onUpdate?: (updatedTask: taskProp | null) => void;
  onIncrementCount: () => void;
  onDecrementCount: () => void;
  rename: React.Dispatch<React.SetStateAction<boolean>>
}

export function Menu({
  onDelete,
  // onUpdate,
  onIncrementCount,
  onDecrementCount,
  rename,
}: TaskMenuProps) {
  const buttonMenu = (
    <button className="menu__btn">
      <svg
        width="26"
        height="6"
        viewBox="0 0 26 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
        <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
        <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
      </svg>
    </button>
  );

  // const handleItemClick = (content: string) => {
  //   console.log("клик по:", content);
  // };

  const isDesktop = window.innerWidth > 768;
  const block = (
    <div className="menu">
      <DropDown
        onOpen={() => console.log("Открытие")}
        onClose={() => console.log("закрытие")}
        button={buttonMenu}
      >
        <DropItemIco text="Удалить" specialClass="yellow" onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
          >
            <path
              d="M0 12H14L7 0L0 12ZM7.63636 10.1053H6.36364V8.8421H7.63636V10.1053ZM7.63636 7.57895H6.36364V5.05263H7.63636V7.57895Z"
              fill="#999999"
            />
          </svg>
        </DropItemIco>

        <DropItemIco
          text="--1"
          specialClass="yellow"
          onClick={onDecrementCount}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
          >
            <path
              d="M0 12H14L7 0L0 12ZM7.63636 10.1053H6.36364V8.8421H7.63636V10.1053ZM7.63636 7.57895H6.36364V5.05263H7.63636V7.57895Z"
              fill="#999999"
            />
          </svg>
        </DropItemIco>
        <DropItemIco
          text="++1"
          specialClass="yellow"
          onClick={onIncrementCount}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
          >
            <path
              d="M0 12H14L7 0L0 12ZM7.63636 10.1053H6.36364V8.8421H7.63636V10.1053ZM7.63636 7.57895H6.36364V5.05263H7.63636V7.57895Z"
              fill="#999999"
            />
          </svg>
        </DropItemIco>

        <DropItemAssociated
          text="Изменить"
          specialClass="yellow"
          onClick={() => rename(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
          >
            <path
              d="M0 12H14L7 0L0 12ZM7.63636 10.1053H6.36364V8.8421H7.63636V10.1053ZM7.63636 7.57895H6.36364V5.05263H7.63636V7.57895Z"
              fill="#999999"
            />
          </svg>
        </DropItemAssociated>
      </DropDown>
    </div>
  );
  return block;
}
