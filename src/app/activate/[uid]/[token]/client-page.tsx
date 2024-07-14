"use client";

import { useRouter } from 'next/navigation';
import styles from "./token.module.scss";
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/app/clientProvider';
import { Progress } from 'antd';

interface VerifyPageProps {
  uid: string;
  token: string;
}

const VerifyPage = ({ uid, token }: VerifyPageProps) => {
  const { store } = useContext(Context);
  const { replace } = useRouter();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    activateAccount();
    setInterval(() => setCount(prev => prev + 1), 100);
  }, [store]);

  const activateAccount = async () => {
    try {
      store.activation(uid, token);
      setTimeout(goToLogin, 5000);
    } catch (error) {
      // handle error
    }
  };

  const goToLogin = () => {
    replace('/auth/login');
  };

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
            strokeLinecap='round'
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
