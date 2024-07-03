import { Button } from 'antd'
import React from 'react'
import styles from "./header.module.scss";
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function AppHeader() {
  return (
    <div className={styles.main}>
        <Button href='/' iconPosition='start' icon={<ArrowLeftOutlined />}>Назад</Button>
    </div>
  )
}

