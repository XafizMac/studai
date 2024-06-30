"use client";

import { useParams } from 'next/navigation';
import styles from "./token.module.scss"
import { useContext, useEffect } from 'react';
import { Context } from '@/app/layout';
import axios from 'axios';

const VerifyPage = () => {
  const params = useParams();
  const { uid, token } = params as { uid: string, token: string };
  const { store } = useContext(Context)

  useEffect(() => {
    activateAccount()
  }, [])

  const activateAccount = async () => {
    try {
      store.activation(uid, token)
      // console.log("User ID: ", uid, "\n", "Token: ", token);
    }
    catch (error) {
      console.log("Error", error);
    }
  }

  if (!uid || !token) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <div className="container">
        <p className={styles.title}>Активируем ваш аккаунт</p>
        <p>{uid}</p>
        <p>{token}</p>
      </div>
    </div>
  );
};

export default VerifyPage;
