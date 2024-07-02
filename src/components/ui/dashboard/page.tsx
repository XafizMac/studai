import { FC, useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import Image from "next/image";
import logo from "../../../../public/logo.svg"
import { Avatar, Button, Dropdown, MenuProps, Select, Space } from "antd";
import { setLang } from "@/context/lang";
import { AllowedLangs } from "@/constants/lang";
import { Context } from "@/app/layout";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import referat from "../../../../public/icons/referat-icon.svg"
import doklad from "../../../../public/icons/referat-icon2.svg"
import course from "../../../../public/icons/referat-icon3.svg"
import srs from "../../../../public/icons/referat-icon4.svg"

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
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
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
                        <Select
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
                    </div>
                    <div className={styles.workTypesBlock}>
                        <div className={styles.author}>
                            <Space>
                                <Avatar>U</Avatar>
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <Button>
                                        <Space>
                                            <p>{store.me.firstName} {store.me.lastName.charAt(0)}.</p>
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </Space>
                            <Button type="default">Поддержка</Button>
                        </div>
                        <div className={styles.workTypes}>
                            <p className={styles.title}>Что вы создадите сегодня?</p>
                            <div className={styles.cards}>
                                <Link className={styles.card} href={"/generation"}>
                                    <p>Реферат</p>
                                    <Image src={referat} alt="" />
                                </Link>
                                <Link className={styles.card} href={"/generation"}>
                                    <p>Доклад</p>
                                    <Image src={doklad} alt="" />
                                </Link>
                                <Link className={styles.card} href={"/generation"}>
                                    <p>Курсовая работа</p>
                                    <Image src={course} alt="" />
                                </Link>
                                <Link className={styles.card} href={"/generation"}>
                                    <p>СРС</p>
                                    <Image src={srs} alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Works */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard