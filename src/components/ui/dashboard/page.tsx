import { FC, useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import Image from "next/image";
import logo from "../../../../public/logo.svg"
import { Avatar, Button, Dropdown, MenuProps, Select, Space } from "antd";
import { setLang } from "@/context/lang";
import { AllowedLangs } from "@/constants/lang";
import Link from "next/link";
import { DownOutlined, LogoutOutlined, UserSwitchOutlined } from "@ant-design/icons";
import Works from "../works/Works";
import { Context } from "@/app/clientProvider";
import { strict } from "assert";

const Dashboard: FC = () => {

    const { store } = useContext(Context);
    const [loading, setLoading] = useState(true);

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
    const items: MenuProps['items'] = [
        {
            label: 'Выйти',
            key: '3',
            danger: true,
            icon: <LogoutOutlined />
        },
    ];

    return (
        <div className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    <div className={styles.header}>
                        <div className={styles.logo}>
                            <Image width={60} src={logo} alt="" />
                        </div>
                        <Space>
                            <Select
                                className={styles.lang}
                                variant="borderless"
                                defaultValue="Русский"
                                style={{ width: 120 }}
                                onChange={handleSwitchLang}
                                options={[
                                    { value: 'ru', label: 'Русский' },
                                    { value: 'kg', label: 'Кыргызча' },
                                    { value: 'en', label: 'English' },
                                ]}
                            />
                            <Avatar>{store.me.firstName.charAt(0)}</Avatar>
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <Button type="text">
                                    <Space>
                                        <p>{store.me.firstName} {store.me.lastName.charAt(0)}.</p>
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </Space>
                    </div>
                    <div className={styles.workTypesBlock}>
                        <div className={styles.author}>
                            <Button icon={<UserSwitchOutlined />} iconPosition="start" type="default">Поддержка</Button>
                        </div>
                        <div className={styles.workTypes}>
                            <p className={styles.title}>Что вы создадите сегодня?</p>
                            <div className={styles.cards}>
                                <Link className={styles.card} href={"/generation"}>
                                    <p>Реферат</p>
                                </Link>
                                <Link className={styles.card} href={"/generation"}>
                                    <p>Доклад</p>
                                </Link>
                                <Link className={styles.card} href={"/generation"}>
                                    <p>Курсовая работа</p>

                                </Link>
                                <Link className={styles.card} href={"/generation"}>
                                    <p>СРС</p>
                                </Link>
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