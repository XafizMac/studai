"use client"

import { FC } from "react";
import styles from "./Mainpage.module.scss";
import fire from "../../../../public/img/fire.png";
import Image from "next/image";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import CountUp from "react-countup";
import ariet from "../../../../public/img/ariet.jpg";
import robot from "../../../../public/img/robot.svg";
import robot_detail from "../../../../public/img/robot-details.svg";
import Rain from "@/components/elements/Rain";

const MotionImage = motion(Image);
const arietUrl = ariet.src;

const MainPage: FC = () => {
    const { lang, translations } = useLang();
    const page = translations[lang].mainpage;
    return (
        <div id="/" className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            <motion.span
                                className={styles.span}
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {page.title[0]}
                                <span className={`${styles.activeSpan} active`}> {page.title[1]}
                                    <MotionImage
                                        width={50}
                                        className={styles.fire}
                                        src={fire}
                                        alt=""
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.5,
                                            ease: [0, 0.71, 0.2, 1.01]
                                        }}
                                    />
                                </span>
                            </motion.span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1
                            }}
                            className={styles.description}>
                            <p>{page.description}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                            }}
                            className={styles.done_works}>
                            <div className={styles.workTypes}>
                                <div className={styles.type}>
                                    <p className="active"><CountUp duration={4} end={200} />+</p>
                                    <span>{page.worktypes[0]}</span>
                                </div>
                                <div className={styles.type}>
                                    <p className="active"><CountUp duration={4} end={50} />+</p>
                                    <span>{page.worktypes[1]}</span>
                                </div>
                                <div className={styles.type}>
                                    <p className="active"><CountUp duration={4} end={200} />+</p>
                                    <span>{page.worktypes[2]}</span>
                                </div>
                                <div className={styles.type}>
                                    <p className="active"><CountUp duration={4} end={100} />+</p>
                                    <span>{page.worktypes[3]}</span>
                                </div>
                            </div>
                            <div className={styles.avatars}>
                                <Avatar.Group
                                    size="default"
                                    max={{
                                        count: 4,
                                        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
                                    }}
                                >
                                    <Avatar src="https://images.unsplash.com/photo-1622104551503-0d869c6224bf?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                    <Avatar src={arietUrl} style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                    <Avatar style={{ backgroundColor: '#f56a00' }}>A</Avatar>
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                </Avatar.Group>
                                <p className={styles.helpPeoples}>{page.works[1]}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.4,
                            }}
                            style={{ width: '100%' }}
                        >
                            <Button size="large" className={styles.btn}>{translations[lang].mainpage.button}</Button>
                        </motion.div>
                    </div>
                    <div className={styles.robot}>
                        <Image width={150} className={styles.img} src={robot} alt="" />
                        <Image className={styles.details_img} src={robot_detail} alt="" />
                        <Rain/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage