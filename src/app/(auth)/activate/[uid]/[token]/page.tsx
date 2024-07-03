"use client";

import { useParams, useRouter } from 'next/navigation';
import styles from "./token.module.scss"
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/app/clientProvider';
import { Progress } from 'antd';

const VerifyPage = () => {
  const params = useParams();
  const { uid, token } = params as { uid: string, token: string };
  const { store } = useContext(Context)
  const { replace } = useRouter();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    activateAccount()
    setInterval(() => setCount(prev => prev + 1), 100)
  }, [])

  if (!uid || !token) {
    return <div>Loading...</div>;
  }

  const activateAccount = async () => {
    try {
      store.activation(uid, token)
      setTimeout(goToLogin, 5000);
    }
    catch (error) {
    }
  }

  const goToLogin = () => {
    replace('/auth/login');
  }

  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.main_row}>
          <p className={styles.title}>Активация аккаунта</p>
          <Progress
            type='circle'
            percent={count}
            format={(percent) => `${percent} %`}
            strokeColor={""}
            trailColor='white'
            // strokeWidth={20}
            strokeLinecap='round'
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
