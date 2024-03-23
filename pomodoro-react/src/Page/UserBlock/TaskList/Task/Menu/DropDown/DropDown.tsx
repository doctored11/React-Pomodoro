import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";

export interface dropProp {
    onDelete: () => void; 
    onUpdate: (updatedTask: taskProp) => void; 
  }

export function DropDown({ onDelete, onUpdate }:dropProp){
    

}