import * as React from "react";
// import "./dropItemIco.css";
import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

interface DropItemAssociatedProps {
  children: React.ReactNode;
  text: string;
  specialClass?: string;

  onClick?: () => void; 
}

const NOOP = () => {};

export function DropItemAssociated({
  children,
  text,
  specialClass = "",
  onClick = NOOP,
  
}: DropItemAssociatedProps) {
 

  return (
    <div className={`drop-item ${specialClass}`}>
      <div className="drop-svg-block">{children}</div>
      <div className="drop-content-block">
        <p className="drop-content">{text}</p>
        <button onClick={onClick}>Изменить название</button>
      </div>
    </div>
  );
}
