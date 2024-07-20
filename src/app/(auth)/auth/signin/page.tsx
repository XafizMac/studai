"use client";

import Image from "next/image";
import styles from "./signin.module.scss";
import logo from "../../../../../public/logo.svg";
import type { FormProps } from "antd";
import { Button, Divider, Form, Input, message } from "antd";
import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/clientProvider";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";

const Grotesque = localFont({
  src: "../../../../../public/fonts/GetVoIP_Grotesque.otf",
  display: "swap",
});

type FieldType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export default function SignIn() {
  const { store } = useContext(Context);
  const { replace, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store, store.isAuth]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const result = await store.registration(
        values.email,
        values.firstName,
        values.lastName,
        values.password,
      );
      console.log(result);
      if (result.status === 201) {
        success();
        push(`/auth/activation?email=${encodeURIComponent(values.email)}`);
      } else {
        error(result.statusText);
      }
    } catch (e) {
      console.error("Error during registration:", e);
      error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content:
        "Регистрация прошла успешно, перенаправление на страницу активации...",
    });
  };

  const error = (message?: string) => {
    messageApi.open({
      type: "error",
      content: message || "Ошибка при регистрации",
    });
  };

  return (
    <div className={styles.main}>
      {contextHolder}
      <div className={styles.form}>
        <Link href={"/"} className={styles.logo}>
          <Image width={40} src={logo} alt="Logo" />
          <p className={`${Grotesque.className} active`}>Studai</p>
        </Link>
        <p className={styles.title}>Регистрация</p>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="on"
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
                placeholder="e-mail"
                size="large"
              />
            </Form.Item>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            transition={{ duration: 0.4 }}
          >
            {/* <p>Имя</p> */}
            <Form.Item<FieldType>
              rules={[{ required: true, message: "Пожалуйста, введите имю!" }]}
              name={"firstName"}
            >
              <Input
                prefix={<UserOutlined />}
                type="text"
                placeholder="Имя"
                size="large"
              />
            </Form.Item>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            transition={{ duration: 0.6 }}
          >
            {/* <p>Фамилия</p> */}
            <Form.Item<FieldType>
              name="lastName"
              rules={[
                { required: true, message: "Пожалуйста, введите фамилию" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                type="text"
                placeholder="Фамилия"
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
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифру и специальный символ!",
                },
              ]}
              name={"password"}
            >
              <Input.Password
                // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                prefix={<LockOutlined />}
                placeholder="Введите пароль"
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
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
        <p className={styles.haveAccount}>
          Уже есть аккаунт? <Link href={"/auth/login"}>Войти</Link>
        </p>
        <Divider className={styles.devider} orientation="center" plain>
          Или
        </Divider>
        <Button
          className={styles.googleBtn}
          size="large"
          icon={<GoogleOutlined />}
          type="default"
        >
          Войти через Google
        </Button>
      </div>
      {/* Image */}
      <div className={styles.background}></div>
    </div>
  );
}
