import React, { useState, useEffect, useRef } from "react";
import { Header } from "./Header/Header";
import { UserBlock } from "./UserBlock/UserBlock";
import styles from "./page.module.css"
export function Page() {
  return (
    <>
      <Header></Header>
      <div className={styles.frame}>
      <UserBlock></UserBlock>
      </div>
    </>
  );
}
