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
  CustomerServiceOutlined,
  DownOutlined,
  InstagramOutlined,
  LogoutOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import Works from "../../../components/ui/works/Works";
import { Context } from "@/app/clientProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

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
      localStorage.clear();
      await axios.get("/api/auth/logout");
      router.push("/auth/login");
    } catch (error) {
      console.error("Ошибка при выходе", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <p onClick={logout}>{dashboard.logoutbtn}</p>,
      key: "3",
      danger: true,
      icon: <LogoutOutlined />,
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
                <Avatar src={store.me.photo} size="large">
                  {store.me.firstName.charAt(0)}
                </Avatar>
              </Badge>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Button type="text">
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
          href="https://te.me/@Ariet_Amanbekov"
          icon={<InstagramOutlined />}
        />
        <FloatButton
          target="_blank"
          href="https://wa.me/+996702160703"
          icon={<WhatsAppOutlined />}
        />
      </FloatButton.Group>
    </div>
  );
};

export default Dashboard;
