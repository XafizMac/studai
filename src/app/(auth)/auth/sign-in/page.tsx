'use client'

import Image from "next/image";
import styles from "./signin.module.scss";
import logo from "../../../../../public/logo.svg";
import type { FormProps } from 'antd';
import { Button, Divider, Form, Input, message } from 'antd';
import { GoogleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Context } from "@/app/layout";
import { useRouter } from "next/navigation";

type FieldType = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export default function SignIn() {
    const { store } = useContext(Context);
    const { replace, push } = useRouter();
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store, store.isAuth])



    if (store.isAuth) {
        push('/dashboard');
    } else{
        store.checkAuth();
    }


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        store.registration(values.email, values.firstName, values.lastName, values.password);
        success();
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Регистрация успешно',
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
                <p className={styles.title}>Регистрация</p>
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
                        transition={{ duration: 0.4 }}
                    >
                        <p>Имя</p>
                        <Form.Item<FieldType>
                            rules={[{ required: true, message: 'Пожалуйста, введите имю!' }]}
                            name={"firstName"}
                        >
                            <Input type="text" placeholder="Имя" size="large" />
                        </Form.Item>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100%' }}
                        transition={{ duration: 0.6 }}
                    >
                        <p>Фамилия</p>
                        <Form.Item<FieldType>
                            name="lastName"
                            rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
                        >
                            <Input type="text" placeholder="Фамилия" size="large" />
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
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
                <p className={styles.haveAccount}>Уже есть аккаунт? <Link href={"/auth/login"}>Войти</Link></p>
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