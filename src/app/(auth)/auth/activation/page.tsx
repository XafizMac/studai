'use client'

import { useSearchParams } from "next/navigation";
import styles from "./activation.module.scss";


export default function Activation() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <p className={`${styles.title} active`}>Подтвердите свой адрес электронной почты</p>
        <p className={styles.subtitle}>Чтобы продолжить регистрацию, перейдите по ссылке, которую мы отправили по электронной почте <b>{email}</b></p>
      </div>
      {/* Image */}
      <div className={styles.background}></div>
    </div>
  );
}
