'use client'

import React, { FC, useEffect, useState } from 'react'
import styles from "./Navbar.module.scss"
import { Button, Dropdown, Select, Space } from 'antd'
import Image from 'next/image'
import { CloseOutlined, MenuOutlined, TranslationOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/hooks/useLang'
import { setLang } from '@/context/lang'
import { AllowedLangs } from '@/constants/lang'
import { motion } from 'framer-motion'
import Router from "next/router"

const Navbar: FC = () => {
    const { lang, translations } = useLang();
    const [isMenuModalOpen, setMenuModalOpen] = useState(false)
    const [scrollDirection, setScrollDirection] = useState('up');
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    const handleScroll = () => {
        const currentlyScrollY = window.scrollY;

        if (currentlyScrollY > lastScrollY) {
            setScrollDirection('down')
        }
        else {
            setScrollDirection('up')
        }
        setLastScrollY(currentlyScrollY)
    }

    

    const handleSwitchLang = (lang: string) => {
        setLang(lang as AllowedLangs);
        localStorage.setItem('lang', JSON.stringify(lang));
    }
    const handleModalSwitch = () => {
        setMenuModalOpen(!isMenuModalOpen);
        console.log(isMenuModalOpen);
    }
    const pathname = usePathname();
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: scrollDirection === 'up' ? 0 : -100 }}
            transition={{ duration: 0.5 }}
            className={styles.header}>
            <div className="container">
                <div className={styles.header_row}>
                    <div className={styles.logoAndBurger}>
                        <MenuOutlined onClick={handleModalSwitch} className={styles.menu_burger} />
                        <Link href={"/"}>
                            <div className={styles.logo}>
                                <Image width={50} height={50} src={"./logo.svg"} alt='' />
                                <p className='active'>StudAI</p>
                            </div>
                        </Link>
                    </div>
                    <ul className={styles.ul}>
                        <CloseOutlined className={styles.closeBtn} />
                        <Link className={`${styles.link} ${pathname == '/' && 'active'}`} href={"/"}>{translations[lang].header.menu[0]}</Link>
                        <Link className={`${styles.link} ${pathname == '#services' && 'active'}`} href="#services">{translations[lang].header.menu[1]}</Link>
                        <Link className={`${styles.link} ${pathname == '#inctruction' && 'active'}`} href="#inctruction">{translations[lang].header.menu[2]}</Link>
                        <Link className={`${styles.link} ${pathname == '#pricing' && 'active'}`} href="#pricing">{translations[lang].header.menu[3]}</Link>
                    </ul>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5 }}
                        className={styles.btns}>
                        <Select
                            onChange={(value) => handleSwitchLang(value)}
                            variant='borderless'
                            size='large'
                            defaultValue={"ru"}
                            dropdownStyle={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                backdropFilter: 'blur(5px)',
                            }}
                            style={{
                                WebkitTextFillColor: 'white',
                            }}
                            className={styles.select}
                        >
                            <Select.Option value="ru">Русский</Select.Option>
                            <Select.Option value="kg">Кыргызча</Select.Option>
                            <Select.Option value="en">English</Select.Option>
                        </Select>
                        {/* Войти */}
                        <Button className={styles.btn}>{translations[lang].header.button}</Button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Navbar