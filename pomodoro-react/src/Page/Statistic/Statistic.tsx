import React, { useEffect, useState } from "react";
import styles from "./statistic.module.css";
import "../../index.css";
import "../../media.css";
import { Graphic } from "./Graphic/Graphic";

export function Statistic() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("7");

  const [dailyStats, setDailyStats] = useState({
    pomodors: 0,
    idleTime: 0,
    pauses: 0,
    workTime: 0,
    focus: 0,
  });

  useEffect(() => {
    const fetchDailyStats = () => {
      const today = new Date().toISOString().split("T")[0];
      const savedStats = JSON.parse(localStorage.getItem(today) || "{}");

      const pomodors = savedStats.pomodors || 0;
      const idleTime = savedStats.pauseTime || 0;
      const pauses = savedStats.pauseCount || 0;
      const workTime = pomodors * 60; // вставить константу как у помидора 
      const totalTime = workTime + idleTime;
      const focus = totalTime > 0 ? (workTime / totalTime) * 100 : 0;

      setDailyStats({
        pomodors,
        idleTime,
        pauses,
        workTime,
        focus,
      });
    };

    fetchDailyStats();
  }, []);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  const getTomatoLabel = (count: number) => {
    if (count === 1) return "помидор";
    if (count > 1 && count < 5) return "помидора";
    return "помидоров";
  };

  return (
    <div className={`frame ${styles.statisticsFrame}`}>
      <div className={styles.statisticsHeader}>
        <h2 className={styles.headerTitle}>Ваша активность</h2>
        <div className={styles.weekSelector}>
          <select className={styles.select} value={selectedPeriod} onChange={handlePeriodChange}>
            <option value="7">Эта неделя</option>
            <option value="14">Две недели</option>
            <option value="all-time">Все время</option>
          </select>
        </div>
      </div>
      <div className={styles.statisticsContent}>
        <div className={styles.daySummary}>
          <h3 className={styles.daySummaryTitle}>Рабочий день</h3>
          <p className={styles.daySummaryText}>
            Вы работали над задачами в течение <span className={styles.highlightText}>{dailyStats.workTime} минут</span>
          </p>
        </div>

        <div className={styles.tomatoes}>
          <img src="../../source/tomatoYang.png" alt="Tomato" className={styles.tomatoImage} />
          <p className={styles.tomatoCount}>
            {dailyStats.pomodors} {getTomatoLabel(dailyStats.pomodors)}
          </p>
        </div>

        <div className={styles.chartContainer}>
          <Graphic selectedPeriod={selectedPeriod} />
        </div>

        <div className={styles.focusSummary}>
          <h4 className={styles.summaryTitle}>Фокус</h4>
          <p className={styles.summaryValue}>{dailyStats.focus.toFixed(2)}%</p>
        </div>
        <div className={styles.pauseSummary}>
          <h4 className={styles.summaryTitle}>Время на паузе</h4>
          <p className={styles.summaryValue}>{dailyStats.idleTime} сек</p>
        </div>
        <div className={styles.stopsSummary}>
          <h4 className={styles.summaryTitle}>Остановки</h4>
          <p className={styles.summaryValue}>{dailyStats.pauses}</p>
        </div>
      </div>
    </div>
  );
}
