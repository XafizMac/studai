"use client"

import Image from "next/image"
import styles from "./login.module.scss"
import logo from "../../../../../public/logo.svg"
import type { FormProps } from 'antd';
import { Button, Divider, Form, Input, message } from 'antd';
import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons"
import Link from "next/link"
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/clientProvider";

type FieldType = {
    email: string;
    password: string;
};

export default function Login() {
    const { store } = useContext(Context);
    const { push, replace } = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store, store.isAuth]);

    if (store.isAuth) {
        replace('/')
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true)
        try {
            const result = await store.login(values.email, values.password)
            if (result.status == 200) {
                success();
                push('/')
            } else {
                error(result.statusText)
            }
        }
        catch (e) {
            error('Unexpected error occurred')
        }
        finally {
            setLoading(false)
        }
    }

    const success = () => {
        // setLoading(false)
        messageApi.open({
            type: 'success',
            content: 'Перенаправление на главную страницу...',
        });
    };

    const error = (message?: string) => {
        // setLoading(false)
        messageApi.open({
            type: 'error',
            content: message || 'Ошибка при регистрации',
        });
    };

    return (
        <div className={styles.main}>
            {contextHolder}
            <div
                className={styles.form}>
                <Link href={"/"} className={styles.logo}>
                    <Image width={60} src={logo} alt="Logo" />
                    <p className="active">Studai</p>
                </Link>
                <p className={styles.title}>Логин</p>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    className={styles.forms}
                >
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100%' }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* <p>Электронная почта</p> */}
                        <Form.Item<FieldType>
                            rules={[{ required: true, message: 'Пожалуйста, введите адрес электронной!' }]}
                            name={"email"}
                        >
                            <Input prefix={<UserOutlined />} type="email" placeholder="Введите email" size="large" />
                        </Form.Item>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100%' }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* <p>Пароль</p> */}
                        <Form.Item<FieldType>
                            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
                            name={"password"}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Введите пароль" size="large" />
                        </Form.Item>
                    </motion.div>
                    <Form.Item>
                        <Button loading={loading} className={styles.btn} size="large" type="primary" htmlType="submit">
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