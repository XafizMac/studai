import { Button } from 'antd'
import React from 'react'
import styles from "./header.module.scss";

export default function AppHeader() {
  return (
    <div className={styles.main}>
        <Button>Назад</Button>
    </div>
  )
}
