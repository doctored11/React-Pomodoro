import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import * as React from "react";
import style from "./dropDown.module.css";
import { Dispatch, SetStateAction } from "react";

interface IDropDownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  onOpen?: () => void;
}

const NOOP = () => {};
export function DropDown({
  button,
  children,
  isDropdownOpen,
  setIsDropdownOpen,
}: IDropDownProps) {
  // React.useEffect(() => {
  //   setIsDropdownOpen(isOpen);
  // }, [isOpen]);

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropDown = (
    <div className={style.container}>
      <div className={style.listContainer} onClick={handleOpen}>
        {button }
        {isDropdownOpen && <div className={style.list}>{children}</div>}
      </div>
      
     </div>
  );

  return dropDown;
}
