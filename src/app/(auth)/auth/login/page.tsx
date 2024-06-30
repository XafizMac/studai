"use client"

import Image from "next/image"
import styles from "./login.module.scss"
import logo from "../../../../../public/logo.svg"
import type { FormProps } from 'antd';
import { Button, Divider, Form, Input } from 'antd';
import { GoogleOutlined } from "@ant-design/icons"
import Link from "next/link"
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Context } from "@/app/layout";
import { useRouter } from "next/navigation";

type FieldType = {
    email: string;
    password: string;
};

export default function Login() {
    const { store } = useContext(Context);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store]);

    useEffect(() => {
        if (store.isAuth) {
            router.replace('/dashboard');
        }
    }, [store.isAuth, router]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        store.login(values.email, values.password)
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.main}>
            <div
                className={styles.form}>
                <Link href={"/"} className={styles.logo}>
                    <Image width={60} src={logo} alt="Logo" />
                    <p className="active">Studai</p>
                </Link>
                <p className={styles.title}>Авторизация</p>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className={styles.forms}
                >
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100%' }}
                        transition={{ duration: 0.2 }}
                    >
                        <p>Электронная почта</p>
                        <Form.Item<FieldType>
                            rules={[{ required: true, message: 'Пожалуйста, введите адрес электронной!' }]}
                            name={"email"}
                        >
                            <Input type="email" placeholder="e-mail" size="large" />
                        </Form.Item>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100%' }}
                        transition={{ duration: 0.8 }}
                    >
                        <p>Пароль</p>
                        <Form.Item<FieldType>
                            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
                            name={"password"}
                        >
                            <Input.Password placeholder="Введите пароль" size="large" />
                        </Form.Item>
                    </motion.div>
                    <Form.Item>
                        <Button className={styles.btn} size="large" type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>

                <p className={styles.haveAccount}>Нет аккаунта? <Link href={"/auth/sign-in"}>Создать сейчас</Link></p>
                <Divider className={styles.devider} orientation="center" plain>
                    Или
                </Divider>
                <Button className={styles.googleBtn} size="large" icon={<GoogleOutlined />} type="default">Войти через Google</Button>
            </div>
            {/* Image */}
            <div className={styles.background}>
            </div>
        </div>
    )
}