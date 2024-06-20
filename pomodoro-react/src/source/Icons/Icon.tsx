import {PlusIco,MinusIco,DelIco,EditIco} from './res/index'
import styles from "./icons.module.css";
import React from "react";

export interface IIconProps {
  name: EIcons;
  size?: TSizes;
}
type TSizes = 130 | 81 | 40 | 30 | 18 | 14;
export enum EIcons {
  plus = "plus",
  del = "DelIco",
  min = "MinusIco",
  edit = "EditIco",
}

const iconList = {
  plus: <PlusIco />,
  DelIco: <DelIco />,
  MinusIco: <MinusIco />,
  EditIco: <EditIco />,
};

export function Icon({ name, size }: IIconProps) {
  return <div className={styles[`icon-${size}`]}>{iconList[name]}</div>;
}
