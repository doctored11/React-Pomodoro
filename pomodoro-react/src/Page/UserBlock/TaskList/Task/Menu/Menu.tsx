import * as React from "react";
// import "./menu.css";
import { DropDown } from "./DropDown/DropDown";
import { DropItemIco } from "./itemTypes/DropItemIco/DropItemIco";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import { DropItemAssociated } from "./itemTypes/DropItemAssociated/DropItemAssociated";
// import { EIcons, Icon } from 'source/Icons/Icon'; - почему так не могу(
import { EIcons, Icon } from "../../../../../source/Icons/Icon";
import styles from "./menu.module.css";

export interface TaskMenuProps {
  onDelete: () => void;
  onUpdate?: (updatedTask: taskProp | null) => void;
  onIncrementCount: () => void;
  onDecrementCount: () => void;
  rename: React.Dispatch<React.SetStateAction<boolean>>;
  getTask: () => taskProp | null;
}

export function Menu({
  onDelete,
  onIncrementCount,
  onDecrementCount,
  rename,
  getTask,
}: TaskMenuProps) {
  let isOpen = false;
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  const buttonMenu = (
    <button className={styles.menu__btn}>
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

  const block = (
    <div className={styles.menu}>
      {isDropdownOpen && (
        <div
          className={styles.outClick}
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
      <DropDown
        button={buttonMenu}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      >
        <DropItemIco text="Удалить" specialClass="yellow" onClick={onDelete}>
          <Icon name={EIcons.del} size={40} />
        </DropItemIco>

        <DropItemIco
          text="--1"
          onClick={onDecrementCount}
          disabled={(getTask()?.count ?? 0) <= 1}
        >
          <Icon name={EIcons.min} size={40} />
        </DropItemIco>
        <DropItemIco text="++1" onClick={onIncrementCount}>
          <Icon name={EIcons.plus} size={40} />
        </DropItemIco>

        <DropItemAssociated text="Изменить" onClick={() => rename(true)}>
          <Icon name={EIcons.edit} />
        </DropItemAssociated>
      </DropDown>
    </div>
  );
  return block;
}
