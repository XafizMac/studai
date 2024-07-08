"use client"

import { FC } from "react";
import styles from "./footer.module.scss"
import Image from "next/image";
import logo from "../../../../public/logo.svg"
import whatsapp from "../../../../public/icons/Social Icons-1.svg"
import telegram from "../../../../public/icons/Social Icons.svg"
import instagram from "../../../../public/icons/Social Icons-2.svg"
import Link from "next/link";
import instaPhoto from "../../../../public/img/iPhone 13 Pro.svg";

import { useLang } from "@/hooks/useLang";

export const Footer: FC = () => {
    const { lang, translations } = useLang();
    const footerLib = translations[lang].footer;

    return (
        <div className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    <div className={styles.logoblock}>
                        <Image className={styles.logo} width={150} src={logo} alt="" />
                        <div className={styles.medias}>
                            <Link target="_blank" className="active" href={"https://wa.me/+996702160703"}>
                                <Image src={whatsapp} alt="" />
                            </Link>
                            <Link target="_blank" href={"https://te.me/+996702160703"}>
                                <Image src={telegram} alt="" />
                            </Link>
                            <Link target="_blank" href={"https://www.instagram.com/studai.kg?igsh=MW15dHdma2o5cHBrNA=="}>
                                <Image src={instagram} alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.forMedia}>
                        <div className={styles.menu}>
                            <p>{footerLib.details[0]}</p>
                            <Link href={"#"}>{translations[lang].header.menu[0]}</Link>
                            <Link href={"#services"}>{translations[lang].header.menu[1]}</Link>
                            <Link href={"#inctruction"}>{translations[lang].header.menu[2]}</Link>
                            <Link href={"#pricing"}>{translations[lang].header.menu[3]}</Link>
                        </div>
                        <div className={styles.contact}>
                            <p>{footerLib.details[1]}</p>
                            <Link href={"https://contact.me/+996702160703"}>+996 702 160 703</Link>
                            <Link href={""}>+996 779 079 279</Link>
                            <Link href={""}>+996 778 087 629</Link>
                        </div>
                    </div>
                    <div className={styles.instagram}>
                        <p>
                            {footerLib.details[2]}
                        </p>
                        <Link target="_blank" href={"https://www.instagram.com/studai.kg?igsh=MW15dHdma2o5cHBrNA=="}>
                            <Image className={styles.img} src={instaPhoto} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}