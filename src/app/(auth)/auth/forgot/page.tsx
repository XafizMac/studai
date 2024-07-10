"use client";

import Image from "next/image";
import styles from "./forgot.module.scss";
import logo from "../../../../../public/logo.svg";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/clientProvider";
import axios from "axios";

type FieldType = {
  email: string;
};

export default function ForgotPassword() {
  const { store } = useContext(Context);
  const { push, replace } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      await store.resetPassword(values.email);
      if (store.status.status == 204) {
        setSuccessfull(true);
        success();
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
      content: "Проверьте свою почту",
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
        {successfull ? (
          <>
            <p className={styles.title}>Проверьте почту</p>
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
              В вашу почту отправлено ссылка для сброса пароля
            </p>
            <Button type="link" onClick={() => setSuccessfull(false)}>Письмо не пришло?</Button>
          </>
        ) : (
          <>
            <p className={styles.title}>Сброс пароля</p>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              className={styles.forms}
            >
              {/* <p className={styles.subtitle}>Возникли проблемы с авторизацией? Введите свой адрес электронной почты ниже, и мы вышлем вам ссылку для его сброса.</p> */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100%" }}
                transition={{ duration: 0.2 }}
              >
                <Form.Item<FieldType>
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите адрес электронной!",
                    },
                  ]}
                  name={"email"}
                >
                  <Input
                    prefix={<UserOutlined />}
                    type="email"
                    placeholder="Введите email"
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
                  Отправить ссылку сброса
                </Button>
              </Form.Item>
            </Form>
            <p className={styles.remembered}>
              Запомнили свой пароль? <Link href={"/auth/login"}>Войти</Link>
            </p>
          </>
        )}
      </div>
      {/* Image */}
      <div className={styles.background}></div>
    </div>
  );
}
