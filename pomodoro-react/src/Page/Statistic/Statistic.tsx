import React, { useState } from "react";
import styles from "./statistic.module.css";
import "../../index.css";
import "../../media.css";
import { Graphic } from "./Graphic/Graphic";

export function Statistic() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("7");

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setSelectedPeriod(event.target.value);
  };

  return (
    <div className={` frame  ${styles.statisticsFrame}`}>
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
            <h3 className={styles.daySummaryTitle}>Денб рабочий</h3>
            <p className={styles.daySummaryText}>
              Вы работали над задачами в течение{" "}
              <span className={styles.highlightText}>нескольких минут</span>
            </p>
          </div>

          <div className={styles.tomatoes}>
            <img
              src="../../source/tomatoYang.png"
              alt="Tomato"
              className={styles.tomatoImage}
            />
            <p className={styles.tomatoCount}>🤡 помидора</p>
          </div>
        
        <div className={styles.chartContainer}>
       <Graphic selectedPeriod={selectedPeriod} />
        </div>
        {/* todo */}
        <div className={styles.focusSummary}>
          <h4 className={styles.summaryTitle}>Фокус</h4>
          <p className={styles.summaryValue}>Покус</p>
        </div>
        <div className={styles.pauseSummary}>
          <h4 className={styles.summaryTitle}>Время на паузе</h4>
          <p className={styles.summaryValue}>Надо подтянуть</p>
        </div>
        <div className={styles.stopsSummary}>
          <h4 className={styles.summaryTitle}>Остановки</h4>
          <p className={styles.summaryValue}>Они были</p>
        </div>
      </div>
    </div>
  );
}
