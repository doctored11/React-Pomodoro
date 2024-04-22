import { taskProp } from "Page/UserBlock/TaskMaker/TaskMaker";
import React from "react";

const POMODORO_DURATION = 0.3 * 60;
const SHORT_BREAK_DURATION = 0.1 * 60;
const LONG_BREAK_DURATION = 2 * 60;
const POMODORO_COUNT_TO_LONG_BREAK = 4;

interface generalTimerProps {
  taskArr: taskProp[];
}

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursDisplay =
    hours > 0 ? `${hours} час${hours == 1 ? "" : hours > 4 ? "ов" : "а"}` : "";
  const minutesDisplay = minutes > 0 ? `${minutes} мин` : "";

  return `${hoursDisplay} ${minutesDisplay}`;
}

export function GeneralTimer({ taskArr }: generalTimerProps) {
  let totalTimeRemaining = 0;
  taskArr.forEach((task) => {
    const pomodoros = task.count - task.stage;

    const pomodoroTime = pomodoros * POMODORO_DURATION;
    const shortBreaksTime = (pomodoros - 1) * SHORT_BREAK_DURATION;
    const longBreaksTime =
      Math.floor(pomodoros / POMODORO_COUNT_TO_LONG_BREAK) *
      LONG_BREAK_DURATION;

    const taskTimeRemaining = pomodoroTime + shortBreaksTime + longBreaksTime;

    totalTimeRemaining += taskTimeRemaining;
  });

  return <div className="">{formatTime(totalTimeRemaining)} </div>;
}
