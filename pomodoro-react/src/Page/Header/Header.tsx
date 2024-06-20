import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import SVGIcon from "../../utils/SVGIcon";
import { Link } from "react-router-dom";

export function Header() {
  const header = (
    <header className={styles.header}>
      <div className={styles.headerFrame}>
        <a className={styles.logoBlock} href="#">
          <img
            src="../../source/tomatoYang.png"
            alt=""
            className={`${styles.logoPic} logoPic`}
          />
          
          <Link
            className={`${styles.naming}  ${styles.accentTxt} naming txt`}
            to="/"
          >
            Pomodoro
          </Link>


        </a>

        <div className={styles.statisticBlock}>
          {/* <SVGIcon xlinkHref="../source/statistic.svg" classes={styles.svgBlock} /> */}

          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.SVGIcon}
          >
            <g filter="url(#filter0_d_5_313)">
              <path
                d="M10 16H14V0H10V16ZM4 16H8V8H4V16ZM16 5V16H20V5H16Z"
                fill="#DC3E22"
              />
              <path
                d="M13.5 0.5V15.5H10.5V0.5H13.5ZM7.5 8.5V15.5H4.5V8.5H7.5ZM19.5 15.5H16.5V5.5H19.5V15.5Z"
                stroke="black"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_5_313"
                x="0"
                y="0"
                width="24"
                height="24"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_5_313"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_5_313"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>

          <Link
            className={`${styles.txt} ${styles.accentTxt} ${styles.statisticTxt}`}
            to="/stats"
          >
            Статистика
          </Link>
        </div>
      </div>
    </header>
  );
  return header;
}
