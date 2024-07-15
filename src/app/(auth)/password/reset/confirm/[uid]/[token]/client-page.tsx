"use client";

import Image from "next/image";
import styles from "./resetpasswordconfirm.module.scss";
import logo from "../../../../../../../../public/logo.svg";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/clientProvider";
import { UserOutlined } from "@ant-design/icons";

type FieldType = {
  newPassword: string;
};

interface ResetPasswordConfirmProps {
  uid: string;
  token: string;
}

export default function ResetPasswordConfirm({ uid, token }: ResetPasswordConfirmProps) {
  const { store } = useContext(Context);
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      await store.resetPasswordConfirm(
        uid,
        token,
        values.newPassword
      );
      if (store.status.status == 204) {
        success();
        push("/auth/login");
      } else {
        error(store.status.statusText);
      }
    } catch (e) {
      error("Не удалось подключиться к интернету");
    } finally {
      setLoading(false);
    }
  };

  const error = (message?: string) => {
    messageApi.open({
      type: "error",
      content: message || "Ошибка при сбросе пароля",
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Ваш пароль обновлен",
    });
  };

  return (
    <div className={styles.main}>
      {contextHolder}
      <div className={styles.form}>
        <Link href={"/"} className={styles.logo}>
          <Image width={60} src={logo} alt="Logo" />
          <p className="active">Studai</p>
        </Link>
        <p className={styles.title}>Создание пароля</p>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className={styles.forms}
        >
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            transition={{ duration: 0.2 }}
          >
            <Form.Item<FieldType>
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите новый пароль!",
                },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифру и специальный символ!",
                },
              ]}
              name="newPassword"
            >
              <Input.Password
                prefix={<UserOutlined />}
                type="password"
                placeholder="Введите новый пароль"
                size="large"
              />
            </Form.Item>
          </motion.div>
          <Form.Item>
            <Button
              loading={loading}
              className={styles.btn}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Сбросить пароль
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.background}></div>
    </div>
  );
}
