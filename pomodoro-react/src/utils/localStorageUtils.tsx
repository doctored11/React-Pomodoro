interface dayStatisticType {
  pomodors: number;
  pauseTime: string;
  pauseCount: number;
}

export class StatisticTool {
  //это будет статичный класс для работы с LocalStorage - не знаю нормально ли так делать в React, но почему бы нет
  // воспоминания из Java
  static emptyObj = {
    pomodors: 0,
    pauseTime: "0:0:0",
    pauseCount: 0,
  };

  static initializationNewDay() {
    const todayDate = StatisticTool.getNowDay();
    localStorage.setItem(todayDate, JSON.stringify(StatisticTool.emptyObj));
    console.log(todayDate);
  }

  static getStaticByKey(key: string): dayStatisticType {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as dayStatisticType;
    }
    StatisticTool.initializationNewDay();
    return StatisticTool.emptyObj;
  }

  static statisticIncrease(
    pomodorsCount: number,
    pauseTime: string,
    pauseCount: number
  ) {
    const todayDate = StatisticTool.getNowDay();
    const nowStats = StatisticTool.getStaticByKey(todayDate);
    nowStats.pomodors += pomodorsCount;
    nowStats.pauseCount += pauseCount;
    nowStats.pauseTime = StatisticTool.addTimes(nowStats.pauseTime, pauseTime);

    localStorage.setItem(todayDate, JSON.stringify(nowStats));
  }

  static setPomodoreDone() {
    StatisticTool.statisticIncrease(1, "0:0:0", 0);
  }
  static addPauseCount() {
    StatisticTool.statisticIncrease(0, "0:0:0", 1);
  }
  static addPauseTime(time: string) {
    time = StatisticTool.formatTimeFromSeconds(time)
    StatisticTool.statisticIncrease(0, time, 0);
  }

  static getNowDay(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static addTimes(time1: string, time2: string): string {
    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

    let totalSeconds =
      hours1 * 3600 +
      minutes1 * 60 +
      seconds1 +
      hours2 * 3600 +
      minutes2 * 60 +
      seconds2;

    const totalHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const totalMinutes = Math.floor(totalSeconds / 60);
    totalSeconds %= 60;

    return `${totalHours}:${totalMinutes}:${totalSeconds}`;
  }



static formatTimeFromSeconds(timeInSeconds: string): string {
    const seconds = parseInt(timeInSeconds, 10);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
  }
}
