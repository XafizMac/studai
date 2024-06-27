"use client"

import { FC } from "react";
import styles from "./choises.module.scss"
import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import helloIcon from "../../../../public/img/hello.png"
import operative from "../../../../public/img/operative.svg"
import opportunity from "../../../../public/img/opportunity.svg"
import quality from "../../../../public/img/quality.svg"
import profitably from "../../../../public/img/profitably.svg"
import { motion } from "framer-motion"

interface Choise {
    title: string;
    content: string;
    img: string
}

const Choises: FC = () => {
    const { lang, translations } = useLang()
    const choiseContent = translations[lang].choises

    const ChoiseCard: Choise[] = [
        { title: choiseContent.content.operative[0], content: choiseContent.content.operative[1], img: operative },
        { title: choiseContent.content.opportunity[0], content: choiseContent.content.opportunity[1], img: opportunity },
        { title: choiseContent.content.quality[0], content: choiseContent.content.quality[1], img: quality },
        { title: choiseContent.content.profitably[0], content: choiseContent.content.profitably[1], img: profitably },
    ]

    return (
        <div className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.8}}
                        className={styles.title}>
                        <p className="active subtitle">{choiseContent.title}</p>
                        <Image className={styles.icon} src={helloIcon} alt="" />
                    </motion.div>
                    <div className={styles.cards}>
                        {ChoiseCard.map((card: Choise) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className={styles.card}>
                                    <Image className={styles.img} width={100} src={card.img} alt="" />
                                    <div className={styles.card_content}>
                                        <p className={styles.title}>{card.title}</p>
                                        <p className={styles.text_content}>{card.content}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Choises