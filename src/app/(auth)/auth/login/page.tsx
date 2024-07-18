"use client";

import Image from "next/image";
import styles from "./login.module.scss";
import logo from "../../../../../public/logo.svg";
import type { FormProps } from "antd";
import { Button, Divider, Form, Input, message, Typography } from "antd";
import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/clientProvider";
import axios from "axios";

type FieldType = {
  email: string;
  password: string;
};

export default function Login() {
  const { store } = useContext(Context);
  const { push, replace } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const result = await store.login(values.email, values.password);
      if (result.status == 200) {
        await axios.post("/api/auth/login");
        success();
        replace("/dashboard");
      } else {
        error(result.statusText);
      }
    } catch (e) {
      error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Перенаправление на главную страницу...",
    });
  };

  const error = (message?: string) => {
    messageApi.open({
      type: "error",
      content:
        (message ===
          "Не найдено активной учетной записи с указанными данными" &&
          "Неправильный логин или пароль") ||
        "Ошибка при входе",
    });
  };

  const oAuth = async () => {
    setGoogleLoading(true);
    try {
      const response = await store.oAuth();
      console.log(response?.data.authorizationUrl);
      window.location.href = await response?.data.authorizationUrl;
    } catch (e) {
      console.log(e);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      {contextHolder}
      <div className={styles.form}>
        <Link href={"/"} className={styles.logo}>
          <Image width={60} src={logo} alt="Logo" />
          <p className="active">Studai</p>
        </Link>
        <p className={styles.title}>Войти</p>
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
            {/* <p>Электронная почта</p> */}
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            transition={{ duration: 0.8 }}
          >
            {/* <p>Пароль</p> */}
            <Form.Item<FieldType>
              rules={[
                { required: true, message: "Пожалуйста, введите пароль!" },
              ]}
              name={"password"}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Введите пароль"
                size="large"
              />
            </Form.Item>
            <Typography className={styles.forgotPassword}>
              <Link href={"/auth/forgot"}>Забыли пароль?</Link>
            </Typography>
          </motion.div>
          <Form.Item>
            <Button
              loading={loading}
              className={styles.btn}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
        <p className={styles.haveAccount}>
          Нет аккаунта? <Link href={"/auth/signin"}>Создать сейчас</Link>
        </p>
        <Divider className={styles.devider} orientation="center" plain>
          Или
        </Divider>
        <Button
          onClick={oAuth}
          className={styles.googleBtn}
          size="large"
          icon={<GoogleOutlined />}
          type="default"
          loading={googleLoading}
        >
          Войти через Google
        </Button>
      </div>
      {/* Image */}
      <div className={styles.background}></div>
    </div>
  );
}
