'use client'

import { FC, useContext, useState } from "react";
import styles from "./generation.module.scss";
import { Breadcrumb, Button, Form, Input, Space, message, Select } from "antd";
import { ArrowLeftOutlined, HomeOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Context } from "@/app/clientProvider";
import type { FormProps } from 'antd';

type FieldType = {
    workType: string;
    languageOfWork: string;
    workTheme: string;
    discipline: string;
    pageCount: string;
    wishes: string;
    coverPageData: string;
    university?: string;
    authorName?: string;
    groupName?: string;
    teacherName?: string;
};


const Generation: FC = () => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { store } = useContext(Context);
    const { replace, push } = useRouter();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true);
        try {
            // const result = await store;
            // console.log(result);
            // if (result.status === 201) {
            //     success();
            //     push('/auth/activation');
            // } else {
            //     error(result.statusText);
            // }
        } catch (e) {
            console.error('Error during registration:', e);
            error('Unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Регистрация прошла успешно, перенаправление на страницу активации...',
        });
    };

    const error = (message?: string) => {
        messageApi.open({
            type: 'error',
            content: message || 'Ошибка при регистрации',
        });
    };

    return (
        <div className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="on"
                        className={styles.forms}
                    >
                        <Space>
                            <div>
                                <p>Тема работы</p>
                                <Form.Item<FieldType>
                                    rules={[{ required: true, message: 'Пожалуйста, введите адрес электронной!' }]}
                                    name="workTheme"
                                >
                                    <Input prefix={<UserOutlined />} type="email" placeholder="e-mail" size="large" />
                                </Form.Item>
                            </div>
                            <div>
                                <p>Дисциплина</p>
                                <Form.Item<FieldType>
                                    rules={[{ required: true, message: 'Пожалуйста, введите адрес электронной!' }]}
                                    name="discipline"
                                >
                                    <Input prefix={<UserOutlined />} type="email" placeholder="e-mail" size="large" />
                                </Form.Item>
                            </div>
                        </Space>
                        <div>
                            <p>Описание</p>
                            <Form.Item<FieldType>
                                rules={[{ required: true, message: 'Пожалуйста, введите имю!' }]}
                                name={"wishes"}
                            >
                                <Input prefix={<UserOutlined />} type="text" placeholder="Имя" size="large" />
                            </Form.Item>
                        </div>
                        <Space>
                            <div>
                                <p>Язык</p>
                                <Form.Item<FieldType>
                                    name="wishes"
                                    rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
                                >
                                    <Select defaultValue={"1-10"}>
                                        <Select.Option>1-10</Select.Option>
                                        <Select.Option>10-20</Select.Option>
                                        <Select.Option>20-30</Select.Option>
                                        <Select.Option>30-40</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div>
                                <p>Фамилия</p>
                                <Form.Item<FieldType>
                                    name="wishes"
                                    rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
                                >
                                    <Input prefix={<UserOutlined />} type="text" placeholder="Фамилия" size="large" />
                                </Form.Item>
                            </div>
                            <div>
                                <p>Фамилия</p>
                                <Form.Item<FieldType>
                                    name="wishes"
                                    rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
                                >
                                    <Input prefix={<UserOutlined />} type="text" placeholder="Фамилия" size="large" />
                                </Form.Item>
                            </div>
                        </Space>
                        <Form.Item>
                            <Button loading={loading} className={styles.btn} size="large" type="primary" htmlType="submit">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Generation;