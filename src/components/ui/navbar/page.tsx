"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { Button, Select, Space, Typography } from "antd";
import Image from "next/image";
import {
  BankFilled,
  CloseOutlined,
  FileTextFilled,
  HomeFilled,
  MenuOutlined,
  TagsFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/hooks/useLang";
import { setLang } from "@/context/lang";
import { AllowedLangs } from "@/constants/lang";
import { motion } from "framer-motion";
import logo from "../../../../public/logo.svg";
import localFont from "next/font/local";

export const Grotesque = localFont({
  src: "../../../../public/fonts/GetVoIP_Grotesque.otf",
  display: "swap",
  variable: "--grotesque",
});

const Navbar: FC = () => {
  const { lang, translations } = useLang();
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleScroll = () => {
    const currentlyScrollY = window.scrollY;

    if (currentlyScrollY > lastScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    setLastScrollY(currentlyScrollY);
  };
  const handleSwitchLang = (lang: string) => {
    setLang(lang as AllowedLangs);
    localStorage.setItem("lang", JSON.stringify(lang));
  };
  const handleModalSwitch = () => {
    setMenuModalOpen(!isMenuModalOpen);
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === "up" ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className={styles.header}
    >
      <div className="container">
        <div className={styles.header_row}>
          <div className={styles.logoAndBurger}>
            <MenuOutlined
              onClick={handleModalSwitch}
              className={styles.menu_burger}
            />
            <Link href={"/"}>
              <div className={styles.logo}>
                <Image width={55} height={55} src={logo} alt="" />
                <p className={`${Grotesque.className} active`}>Studai</p>
              </div>
            </Link>
          </div>
          <ul
            style={{
              left: isMenuModalOpen ? "0%" : "-100%",
            }}
            className={styles.ul}
          >
            <CloseOutlined
              onClick={handleModalSwitch}
              className={styles.closeBtn}
            />
            <Link
              onClick={handleModalSwitch}
              className={`${styles.link} ${pathname == "/" && "active"}`}
              href={"/"}
            >
              <HomeFilled
                style={{
                  fontSize: 20,
                  color: "#FF6D05",
                }}
              />
              {translations[lang].header.menu[0]}
            </Link>
            <Link
              onClick={handleModalSwitch}
              className={`${styles.link} ${
                pathname == "#services" && "active"
              }`}
              href="#services"
            >
              <FileTextFilled />
              {translations[lang].header.menu[1]}
            </Link>
            <Link
              onClick={handleModalSwitch}
              className={`${styles.link} ${
                pathname == "#inctruction" && "active"
              }`}
              href="#inctruction"
            >
              <TagsFilled />
              {translations[lang].header.menu[2]}
            </Link>
            <Link
              onClick={handleModalSwitch}
              className={`${styles.link} ${pathname == "#pricing" && "active"}`}
              href="#pricing"
            >
              <BankFilled />
              {translations[lang].header.menu[3]}
            </Link>
            <Space className={styles.select} align="center">
              <Typography
                className="active"
                style={{ color: "white", fontSize: "18px" }}
              >
                Язык
              </Typography>
              <Select
                onChange={(value) => handleSwitchLang(value)}
                variant="borderless"
                size="large"
                defaultValue={"ru"}
                dropdownStyle={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(5px)",
                }}
                style={{
                  WebkitTextFillColor: "white",
                }}
              >
                <Select.Option value="ru">Русский</Select.Option>
                <Select.Option value="kg">Кыргызча</Select.Option>
                <Select.Option value="en">English</Select.Option>
              </Select>
            </Space>
          </ul>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.btns}
          >
            <Select
              onChange={(value) => handleSwitchLang(value)}
              variant="borderless"
              size="large"
              defaultValue={"ru"}
              dropdownStyle={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(5px)",
              }}
              style={{
                WebkitTextFillColor: "white",
              }}
              className={styles.select}
            >
              <Select.Option value="ru">Русский</Select.Option>
              <Select.Option value="kg">Кыргызча</Select.Option>
              <Select.Option value="en">English</Select.Option>
            </Select>
            {/* Войти */}

            <Button href="/dashboard" className={styles.btn}>
              {translations[lang].header.button}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
