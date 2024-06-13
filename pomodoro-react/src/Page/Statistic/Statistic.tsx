import React from 'react';
import styles from './statistic.module.css';
import "../../index.css"
import "../../media.css"

export function Statistic() {
  return (
    <div className={` frame  ${styles.statisticsFrame}`}>
      <div className={styles.statisticsHeader}>
        <h2 className={styles.headerTitle}>Ваша активность</h2>
        <div className={styles.weekSelector}>
          <select className={styles.select}>
            <option value="this-week">Эта неделя</option>
            {/* списочек */}
          </select>
        </div>
      </div>
      <div className={styles.statisticsContent}>
        <div className={styles.daySummary}>
          <h3 className={styles.daySummaryTitle}>Понедельник</h3>
          {/* todo */}
          <p className={styles.daySummaryText}>Вы работали над задачами в течение <span className={styles.highlightText}>51 минуты</span></p>
        </div>
        <div className={styles.tomatoes}>

                  {/* todo */}
          <img src="../../source/tomatoYang.png" alt="Tomato" className={styles.tomatoImage} />
          <div className={styles.tomatoCount}>2 помидора</div>
        </div>
        <div className={styles.chartContainer}>
          {/* Здесь будет диаграмма */}
        </div>
                {/* todo */}
        <div className={styles.focusSummary}>
          <h4 className={styles.summaryTitle}>Фокус</h4>
          <p className={styles.summaryValue}>35%</p>
        </div>
        <div className={styles.pauseSummary}>
          <h4 className={styles.summaryTitle}>Время на паузе</h4>
          <p className={styles.summaryValue}>9м</p>
        </div>
        <div className={styles.stopsSummary}>
          <h4 className={styles.summaryTitle}>Остановки</h4>
          <p className={styles.summaryValue}>3</p>
        </div>
      </div>
    </div>
  );
}
