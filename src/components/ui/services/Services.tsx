"use client"

import { FC } from "react";
import styles from "./services.module.scss";
import Image, { type StaticImageData } from "next/image";
import raketa from "../../../../public/img/servise-icon.png"
import { useLang } from "@/hooks/useLang";
import referat from "../../../../public/img/referat.svg"
import srs from "../../../../public/img/srs.svg"
import doklad from "../../../../public/img/doklad.svg"
import coursework from "../../../../public/img/coursework.svg"
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";

interface Card {
    title: string;
    img: StaticImageData;
    id: string;
}


const Services: FC = () => {

    const { lang, translations } = useLang()
    const workTypesTitles = translations[lang].mainpage.worktypes;

    const CardList: Card[] = [
        { title: workTypesTitles[0], id: "1", img: referat },
        { title: workTypesTitles[1], id: "2", img: doklad },
        { title: workTypesTitles[2], id: "3", img: coursework },
        { title: workTypesTitles[3], id: "4", img: srs }
    ]


    return (
        <div id="services" className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    <div className={styles.title_block}>
                        <p className="active subtitle">{translations[lang].service.title}</p>
                        <Image src={raketa} alt="" />
                    </div>
                    <div className={styles.service_cards}>
                        {CardList.map((card: Card) => {
                            return (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                    }}
                                    className={styles.card}>
                                    <Image className={styles.img} src={card.img} alt="" />
                                    <Link className={styles.link} href={"/dashboard"}>
                                        <p className={styles.p}>
                                            {card.title}
                                        </p>
                                        <ArrowRightOutlined />
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services