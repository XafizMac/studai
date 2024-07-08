'use client'

import { FC, useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import Image from "next/image";
import logo from "../../../../public/logo.svg"
import { Avatar, Badge, Button, Dropdown, MenuProps, Select, Space } from "antd";
import { setLang } from "@/context/lang";
import { AllowedLangs } from "@/constants/lang";
import Link from "next/link";
import { DownOutlined, LogoutOutlined, UserSwitchOutlined } from "@ant-design/icons";
import Works from "../../../components/ui/works/Works";
import { Context } from "@/app/clientProvider";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard: FC = () => {

    const { store } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            await store.getUsersMe();
            setLoading(false);
        };

        fetchData();
    }, [store])

    const handleSwitchLang = (lang: string) => {
        setLang(lang as AllowedLangs);
        localStorage.setItem('lang', JSON.stringify(lang));
    }

    const logout = async () => {
        try {
            localStorage.clear();
            await axios.get('/api/auth/logout');
            router.push('/auth/login');
        } catch (error) {
            console.error('Ошибка при выходе', error);
        }
    };

    const items: MenuProps['items'] = [
        {
            label: <p onClick={logout}>Выйти</p>,
            key: '3',
            danger: true,
            icon: <LogoutOutlined />
        },
    ];

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.header_container}>
                    <div className={styles.logo}>
                        <Image width={60} src={logo} alt="" />
                    </div>
                    <Space size={20}>
                        <Select
                            className={styles.lang}
                            variant="borderless"
                            defaultValue="Русский"
                            style={{
                                WebkitTextFillColor: 'white',
                            }}
                            onChange={handleSwitchLang}
                            options={[
                                { value: 'ru', label: 'Русский' },
                                { value: 'kg', label: 'Кыргызча' },
                                { value: 'en', label: 'English' },
                            ]}
                        />
                        <Space size={0}>
                            <Badge dot status="success">
                                <Avatar size="large">{store.me.firstName.charAt(0)}</Avatar>
                            </Badge>
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <Button type="text">
                                    <Space>
                                        <p style={{ color: 'white' }}>{store.me.firstName} {store.me.lastName.charAt(0)}.</p>
                                        <DownOutlined style={{
                                            color: 'white',
                                        }} />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </Space>
                    </Space>
                </div>
            </div>
            <div className="container">
                <div className={styles.main_row}>
                    <div className={styles.workTypesBlock}>
                        <div className={styles.author}>
                            <Button href="https://t.me/@Ariet_Amanbekov" icon={<UserSwitchOutlined />} iconPosition="start" type="default">Поддержка</Button>
                        </div>
                        <div className={styles.workTypes}>
                            <p className={styles.title}>Что вы создадите сегодня?</p>
                            <div className={styles.cards}>
                                <Button size="large" className={styles.card} href={"/dashboard/generation"}>
                                    <p>Реферат</p>
                                </Button>
                                <Button size="large" className={styles.card} href={"/dashboard/generation"}>
                                    <p>Доклад</p>
                                </Button>
                                <Button size="large" className={styles.card} href={"/dashboard/generation"}>
                                    <p>Курсовая работа</p>

                                </Button>
                                <Button size="large" className={styles.card} href={"/dashboard/generation"}>
                                    <p>СРС</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Works />
                </div>
            </div>
        </div>
    )
}

export default Dashboard