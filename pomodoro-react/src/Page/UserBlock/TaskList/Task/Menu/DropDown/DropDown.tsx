import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import * as React from "react";
// import "./dropDown.css";


interface IDropDownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const NOOP = () => {};
export function DropDown({
  button,
  children,
  isOpen,
  onClose = NOOP,
  onOpen = NOOP,
}: IDropDownProps) {
  
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setIsDropdownOpen(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    isDropdownOpen ? onOpen() : onClose();
  }, [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const dropDown = (
    <div className="container">
      <div className="list-container" onClick={handleOpen}>
        {button}
        {isDropdownOpen && <div className="list">{children}</div>}
      </div>
    </div>
  );

  return dropDown;
}
