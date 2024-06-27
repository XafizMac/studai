"use client"

import { Button, Table } from "antd";
import { FC } from "react";
import styles from "./Pricing.module.scss";
import icon from "../../../../public/img/pricing-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { motion } from "framer-motion";

export const Pricing: FC = () => {
    const { lang, translations } = useLang();
    const pricingLib = translations[lang].pricing;
    const type = translations[lang].mainpage.worktypes;
    const btn = <Button href="/works" type="link">{pricingLib.table.button}</Button>

    const dataSource = [
        {
            key: '1',
            type: type[0],
            "1_10": '250 сом',
            "10_20": "450 сом",
            "20_30": "700 сом",
            "30_40": "1000 сом",
            action: btn
        },
        {
            key: '2',
            type: type[1],
            "1_10": '300 сом',
            "10_20": "500 сом",
            "20_30": "750 сом",
            "30_40": "1100 сом",
            action: btn
        },
        {
            key: '3',
            type: type[3],
            "1_10": '400 сом',
            "10_20": "700 сом",
            "20_30": "1000 сом",
            "30_40": "1300 сом",
            action: btn
        },
        {
            key: '1',
            type: type[2],
            "1_10": '250 сом',
            "10_20": "400 сом",
            "20_30": "700 сом",
            "30_40": "1000 сом",
            action: btn
        },
    ];

    const columns = [
        {
            title: pricingLib.table.title,
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '1-10 стр',
            dataIndex: '1_10',
            key: 'page',
        },
        {
            title: '10-20 стр',
            dataIndex: '10_20',
            key: 'page',
        },
        {
            title: '20-30 стр',
            dataIndex: '20_30',
            key: 'page',
        },
        {
            title: '30-40 стр',
            dataIndex: '30_40',
            key: 'page',
        },
        {
            title: 'Действие',
            dataIndex: 'action',
            key: 'action',
        },
    ];


    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    <div className={styles.title}>
                        <p className="active subtitle">{translations[lang].pricing.title}</p>
                        <Image src={icon} alt="" />
                    </div>
                    <Table
                        pagination={false}
                        bordered
                        className={styles.table}
                        dataSource={dataSource}
                        columns={columns} />
                </div>
            </div>
        </motion.div>
    )
}