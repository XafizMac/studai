"use client";

import { useRouter } from "next/navigation";
import styles from "./token.module.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/clientProvider";
import { Button, Progress, Result } from "antd";

interface VerifyPageProps {
  uid: string;
  token: string;
}

const VerifyPage = ({ uid, token }: VerifyPageProps) => {
  const { store } = useContext(Context);
  const { replace } = useRouter();
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    activateAccount();
  }, [store]);

  const activateAccount = async () => {
    try {
      await store.activation(uid, token);
    } catch (error) {
    } finally {
      setActive(true);
    }
  };

  const goToLogin = () => {
    replace("/auth/login");
  };

  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.main_row}>
          <Result
            status={!isActive ? "info" : "success"}
            title={
              isActive
                ? "Учетная запись успешно активирована!"
                : "Активируем ваш аккаунт..."
            }
            subTitle={
              !isActive
                ? "Это займёт не много времени"
                : "Перейдите к входу для авторизации!"
            }
            extra={[
              <Button
                key="console"
                onClick={() => goToLogin()}
                loading={!isActive}
                size="large"
                type="primary"
              >
                {isActive ? "Перейти к входу" : "Активируем"}
              </Button>,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
