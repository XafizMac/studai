import { Avatar, Space, Tag } from "antd";
import styles from "./team.module.scss";
import {
  BehanceOutlined,
  DribbbleOutlined,
  GithubOutlined,
  InstagramOutlined,
  JavaScriptOutlined,
  PythonOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import frontend from "../../../../public/img/frontend.jpg";
import ariet from "../../../../public/img/ariet.jpg";
import backend from "../../../../public/img/backend.jpeg";
import designer from "../../../../public/img/designer.jpeg";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "@/app/clientProvider";
import { useLang } from "@/hooks/useLang";

export default function Team() {
  const { store } = useContext(Context);
  const { lang, translations } = useLang();
  const teamLang = translations[lang].team;

  return (
    <div id="team" className={styles.main}>
      <div className="container">
        <div className={styles.main_row}>
          <p className="active subtitle">{teamLang.title}</p>
          <div className={styles.cards}>
            {/* Ariet */}
            <div className={styles.card}>
              <Avatar
                className={styles.avatar}
                src={ariet.src}
                size={{ xs: 100, sm: 100, md: 150, lg: 180, xl: 200, xxl: 220 }}
              />
              <p>{teamLang.manager.name}</p>
              <Tag icon={<TeamOutlined />} color="green">
                {teamLang.manager.position}
              </Tag>
              <Space size={10}>
                <Link
                  href={
                    "https://www.instagram.com/ariet_amanbekov?igsh=MWV5cDBzZ20xOHBtbA=="
                  }
                >
                  <InstagramOutlined
                    style={{ color: "violet", fontSize: "1.5rem" }}
                  />
                </Link>
                <Link href={"https://github.com/Ariet2003"}>
                  <GithubOutlined
                    style={{ color: "black", fontSize: "1.5rem" }}
                  />
                </Link>
              </Space>
            </div>
            {/* Hafiz */}
            <div className={styles.card}>
              <Avatar
                className={styles.avatar}
                src={frontend.src}
                size={{ xs: 100, sm: 100, md: 150, lg: 180, xl: 200, xxl: 220 }}
              />
              <p>{teamLang.frontend.name}</p>
              <Tag icon={<JavaScriptOutlined />} color="gold">
                {teamLang.frontend.position}
              </Tag>
              <Space size={10}>
                <Link
                  href={
                    "https://www.instagram.com/hafizbey_official?igsh=MWRybWZ3ZzByc3IxNg=="
                  }
                >
                  <InstagramOutlined
                    style={{ color: "violet", fontSize: "1.5rem" }}
                  />
                </Link>
                <Link href={"https://github.com/XafizMac"}>
                  <GithubOutlined
                    style={{ color: "black", fontSize: "1.5rem" }}
                  />
                </Link>
              </Space>
            </div>
            {/* Kuma */}
            <div className={styles.card}>
              <Avatar
                className={styles.avatar}
                src={backend.src}
                size={{ xs: 100, sm: 100, md: 150, lg: 180, xl: 200, xxl: 220 }}
              />
              <p>{teamLang.backend.name}</p>
              <Tag icon={<PythonOutlined />} color="blue">
                {teamLang.backend.position}
              </Tag>
              <Space size={10}>
                <Link
                  href={
                    "https://www.instagram.com/hafizbey_official?igsh=MWRybWZ3ZzByc3IxNg=="
                  }
                >
                  <InstagramOutlined
                    style={{ color: "violet", fontSize: "1.5rem" }}
                  />
                </Link>
                <Link href={"https://github.com/XafizMac"}>
                  <GithubOutlined
                    style={{ color: "black", fontSize: "1.5rem" }}
                  />
                </Link>
              </Space>
            </div>
            {/* Kanyshai */}
            <div className={styles.card}>
              <Avatar
                className={styles.avatar}
                src={designer.src}
                size={{ xs: 100, sm: 100, md: 150, lg: 180, xl: 200, xxl: 220 }}
              />
              <p>{teamLang.designer.name}</p>
              <Tag icon={<DribbbleOutlined />} color="magenta">
                {teamLang.designer.position}
              </Tag>
              <Space size={10}>
                <Link
                  href={
                    "https://www.instagram.com/kanyshai_kasymova_?igsh=N3Z0ZDNqMGdocXBi"
                  }
                >
                  <InstagramOutlined
                    style={{ color: "violet", fontSize: "1.5rem" }}
                  />
                </Link>
                <Link href={"https://www.behance.net/98de13d4"}>
                  <BehanceOutlined
                    style={{ color: "#0f61fe", fontSize: "1.5rem" }}
                  />
                </Link>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
