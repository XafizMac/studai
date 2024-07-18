"use client"

import { useLang } from "@/hooks/useLang";
import { FC } from "react";
import styles from "./instruction.module.scss";
import Image from "next/image";
import icon from "../../../../public/img/instruction.svg";
import lines from "../../../../public/img/instruction-line.svg";

const Instruction: FC = () => {

    const { translations, lang } = useLang();
    const instructionTrans = translations[lang].instruction;

    return (
        <div id="inctruction" className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    <div className={styles.title}>
                        <p className="subtitle active">{instructionTrans.title}</p>
                        <Image className={styles.img} src={icon} alt="" />
                    </div>
                    <div className={styles.cards}>
                        <div className={styles.left}>
                            <div className={styles.card}>
                                <div className={styles.head}>
                                    <p className={styles.number}>2</p>
                                    <p className={styles.title}>{instructionTrans.two[0]}</p>
                                </div>
                                <p className={styles.content}>
                                    {instructionTrans.two[1]}
                                </p>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.head}>
                                    <p className={styles.number}>3</p>
                                    <p className={styles.title}>{instructionTrans.three[0]}</p>
                                </div>
                                <p className={styles.content}>
                                    {instructionTrans.three[1]}
                                </p>
                            </div>
                        </div>
                        <div className={styles.middle}>
                            <div className={styles.middleblock}>
                                <Image className={styles.img} src={lines} alt="" />
                                <div className={styles.one}>
                                    <p>1</p>
                                    <p>
                                        {instructionTrans.one[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.card}>
                                <div className={styles.head}>
                                    <p className={styles.number}>4</p>
                                    <p className={styles.title}>{instructionTrans.four[0]}</p>
                                </div>
                                <p className={styles.content}>
                                    {instructionTrans.four[1]}
                                </p>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.head}>
                                    <p className={styles.number}>5</p>
                                    <p className={styles.title}>{instructionTrans.five[0]}</p>
                                </div>
                                <p className={styles.content}>
                                    {instructionTrans.five[1]}
                                </p>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instruction