import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { dayStatisticType, StatisticTool } from '../../../utils/localStorageUtils';
import styles from "./graphic.module.css"

Chart.register(...registerables);


const getKeysByCountValue = (num: number): string[] => {
    const keys = Object.keys(localStorage)
      .filter((key) => /\d{4}-\d{2}-\d{2}/.test(key))
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) 
      .slice(0, num); 

    return keys;
  };
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
}
interface dateProp{
    selectedPeriod:string
}

const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', options);
  };

export function Graphic({selectedPeriod}:dateProp ){
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Помидоры в день',
        data: [],
        fill: false,
        backgroundColor: '#dc3e22',
        borderColor: '#dc3e22',
      },
    ],
  });

  useEffect(() => {
   
    const loadData = () => {
        let filteredKeys=Object.keys(localStorage)
        console.log(selectedPeriod)
        if (selectedPeriod !== 'all-time') {
            const num = parseInt(selectedPeriod);
            filteredKeys = getKeysByCountValue(num);
          }

        const localStorageData = filteredKeys
        .filter((key) => /\d{4}-\d{2}-\d{2}/.test(key))
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .reduce(
          (acc: { labels: string[]; data: number[] }, key) => {
            const stats: dayStatisticType = JSON.parse(localStorage.getItem(key) || '{}');
            if (stats && typeof stats.pomodors === 'number') {
              acc.labels.push(formatDate(key));
              acc.data.push(stats.pomodors);
            }
            return acc;
          },
          { labels: [], data: [] }
        );

      setData({
        labels: localStorageData.labels,
        datasets: [
          {
            label: 'Помидоры в день',
            data: localStorageData.data,
            fill: false,
            backgroundColor: '#dc3e22',
            borderColor: '#dc3e22',
          },
        ],
      });
    };

    loadData();

  }, [selectedPeriod]);

  return (
    <div  className={styles.graphLine} >
      <Bar data={data} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
      </div>
  );


};


