"use client";

import { FC, useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import Image from "next/image";
import logo from "../../../../public/logo-circle.svg";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  FloatButton,
  MenuProps,
  Select,
  Space,
} from "antd";
import { setLang } from "@/context/lang";
import { AllowedLangs } from "@/constants/lang";
import {
  ArrowRightOutlined,
  BankOutlined,
  CustomerServiceOutlined,
  DownOutlined,
  InstagramOutlined,
  LogoutOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import Works from "../../../components/ui/works/Works";
import { Context } from "@/app/clientProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import telegram from "../../../../public/icons/telegram.png";

const Dashboard: FC = () => {
  const { store } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { lang, translations } = useLang();
  const dashboard = translations[lang].dashboard;

  useEffect(() => {
    const fetchData = async () => {
      await store.getUsersMe();
      setLoading(false);
    };

    fetchData();
  }, [store]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.checkAuth();
    }
  }, [store, store.isAuth]);

  const handleSwitchLang = (lang: string) => {
    setLang(lang as AllowedLangs);
    localStorage.setItem("lang", JSON.stringify(lang));
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.clear();
      router.push("/auth/login");
    } catch (error) {
      console.error("Ошибка при выходе", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: dashboard.profilebtn,
      key: "0",
      disabled: true,
      icon: <UserOutlined />,
      onClick: () => router.push("/dashboard/profile"),
    },
    {
      type: "divider",
    },
    {
      label: dashboard.logoutbtn,
      key: "1",
      danger: true,
      icon: <LogoutOutlined />,
      onClick: () => logout(),
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={styles.header_container}
        >
          <div className={styles.logo}>
            <Image width={60} src={logo} alt="" />
          </div>
          <Space size={20}>
            <Select
              className={styles.lang}
              variant="borderless"
              defaultValue="Русский"
              style={{
                WebkitTextFillColor: "white",
              }}
              onChange={handleSwitchLang}
              options={[
                { value: "ru", label: "Русский" },
                { value: "kg", label: "Кыргызча" },
                { value: "en", label: "English" },
              ]}
            />
            <Space size={0}>
              <Badge dot status="success">
                <Avatar
                  src={store.me.photo ? store.me.photo : null}
                  size="large"
                >
                  {!store.me.photo && store.me.firstName.charAt(0)}
                </Avatar>
              </Badge>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Button type="link">
                  <Space>
                    <p style={{ color: "white" }}>
                      {store.me.firstName} {store.me.lastName.charAt(0)}.
                    </p>
                    <DownOutlined
                      style={{
                        color: "white",
                      }}
                    />
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          </Space>
        </motion.div>
      </div>

      {/* Container */}

      <div className="container">
        <div className={styles.main_row}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.workTypesBlock}
          >
            <div className={styles.author}>
              <Button
                href="/dashboard/pricing"
                icon={<BankOutlined />}
                type="default"
                style={{ width: "max-content" }}
              >
                {translations[lang].header.menu[3]}
              </Button>
              <Select
                className={styles.lang}
                variant="outlined"
                defaultValue="Русский"
                onChange={handleSwitchLang}
                options={[
                  { value: "ru", label: "Русский" },
                  { value: "kg", label: "Кыргызча" },
                  { value: "en", label: "English" },
                ]}
              />
            </div>

            <div className={styles.workTypes}>
              <p className={styles.title}>{dashboard.whatWillCreate}</p>
              <div className={styles.cards}>
                <Button
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  size="large"
                  className={styles.card}
                  href={"/dashboard/generation"}
                >
                  {translations[lang].mainpage.worktypes[0]}
                </Button>
                <Button
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  size="large"
                  className={styles.card}
                  href={"/dashboard/generation"}
                >
                  {translations[lang].mainpage.worktypes[1]}
                </Button>
                <Button
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  size="large"
                  className={styles.card}
                  href={"/dashboard/generation"}
                >
                  {translations[lang].mainpage.worktypes[2]}
                </Button>
                <Button
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  size="large"
                  className={styles.card}
                  href={"/dashboard/generation"}
                >
                  {translations[lang].mainpage.worktypes[3]}
                </Button>
              </div>
            </div>
          </motion.div>
          <Works />
        </div>
      </div>

      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton
          target="_blank"
          href="https://www.instagram.com/studai.kg"
          tooltip="Instagram"
          icon={<InstagramOutlined />}
        />
        <FloatButton
          target="_blank"
          href="https://wa.me/+996555355246"
          tooltip="Whats App"
          icon={<WhatsAppOutlined />}
        />
        <FloatButton
          target="_blank"
          href="https://t.me/studai_app"
          tooltip="Telegram"
          icon={
            <Image
              style={{ translate: "-2px" }}
              width={20}
              height={20}
              src={telegram}
              alt="telergam"
            />
          }
        />
      </FloatButton.Group>
    </div>
  );
};

export default Dashboard;
