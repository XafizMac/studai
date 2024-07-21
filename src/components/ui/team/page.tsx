import { Avatar, Grid, Space, Tag } from "antd";
import styles from "./team.module.scss";
import {
  AntDesignOutlined,
  BehanceOutlined,
  BehanceSquareOutlined,
  DockerOutlined,
  DribbbleOutlined,
  GithubOutlined,
  GitlabOutlined,
  InstagramOutlined,
  JavaScriptOutlined,
  LinkedinOutlined,
  OpenAIOutlined,
  PythonOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import frontend from "../../../../public/img/frontend.jpg";
import ariet from "../../../../public/img/ariet.jpg";
import backend from "../../../../public/img/backend.jpeg";
import designer from "../../../../public/img/designer.jpeg";
import Link from "next/link";

export default function Team() {
  return (
    <div id="team" className={styles.main}>
      <div className="container">
        <div className={styles.main_row}>
          <p className="active subtitle">Наше руководство и люди</p>
          <div className={styles.cards}>
            {/* Ariet */}
            <div className={styles.card}>
              <Avatar
                className={styles.avatar}
                src={ariet.src}
                size={{ xs: 100, sm: 100, md: 150, lg: 180, xl: 200, xxl: 220 }}
              />
              <p>Ариет Сапарбек уулу</p>
              <Tag icon={<TeamOutlined />} color="green">
                Проект Менеджер
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
              <p>Абдулхафиз Жолдошов</p>
              <Tag icon={<JavaScriptOutlined />} color="gold">
                Frontend разработчик
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
              <p>Курманбек Асанов</p>
              <Tag icon={<PythonOutlined />} color="blue">
                Backend разработчик
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
              <p>Канышай Касымова</p>
              <Tag icon={<DribbbleOutlined />} color="magenta">
                UX/UI дизайнер
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
