import { Button } from 'antd'
import React from 'react'
import styles from "./header.module.scss";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function AppHeader() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  }

  return (
    <div className={styles.btn}>
      <Button onClick={goBack} iconPosition='start' icon={<ArrowLeftOutlined />}>Назад</Button>
    </div>
  )
}

