import * as React from "react";
// import "./dropItemIco.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

interface DropItemIcoProps {
  children: React.ReactNode;
  text: string;
  specialClass?: string;
  onClick?: ((taskId?: number) => void) | ((updatedTask?: taskProp | null) => void);
}

const NOOP = () => {};

export function DropItemIco({
  children,
  text,
  specialClass = "",
  onClick = NOOP,
}: DropItemIcoProps) {
  const handleClick = () => {
    onClick();
  };

  const block = (
    <div className={`drop-item ${specialClass}`} onClick={handleClick}>
      <div className="drop-svg-block">{children}</div>

      <div className="drop-content-block">
        <p className="drop-content">{text}</p>
      </div>
    </div>
  );

  return block;
}
