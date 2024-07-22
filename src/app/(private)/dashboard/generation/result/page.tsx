"use client";

import { FC, useContext, useEffect, useState } from "react";
import styles from "./result.module.scss";
import { Context } from "@/app/clientProvider";
import { Avatar, Button, Card, List, message, Skeleton, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import Image from "next/image";
import resultIcon from "../../../../../../public/icons/gresult.svg";
import logo from "../../../../../../public/logo-circle2.svg";
import doubt from "../../../../../../public/icons/doubt.svg";
import AppHeader from "@/components/ui/dash-header/AppHeader";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/useLang";

const Result: FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [myWorkType, setMyWorkType] = useState<string>();
  const [messageApi, contextHolder] = message.useMessage();
  const { store } = useContext(Context);
  const router = useRouter();
  const plan = store.plan;
  const logoUrl = logo.src;
  const workType = plan.workType;
  const { lang, translations } = useLang();
  const resultLang = translations[lang].result;

  useEffect(() => {
    store.getUsersMe();
    if (!store.isAuth) {
      store.checkAuth();
    }
  }, [store.isAuth, store]);

  useEffect(() => {
    universal();
  }, [store]);

  const universal = async () => {
    switch (workType) {
      case "1":
        setMyWorkType("Реферат");
        break;
      case "2":
        setMyWorkType("Самостоятельная работа студента");
        break;
      case "3":
        setMyWorkType("Курсовая работа");
        break;
      case "4":
        setMyWorkType("Доклад");
        break;
      default:
        break;
    }

    try {
      setData(plan.subtopics);
    } catch (e) {
      console.log(e);
    }
    // finally{
    //     checkPlanLength();
    // }
  };

  const regeneratePlan = async () => {
    setLoading(true);
    try {
      const result = await store.regeneratePlan(
        plan.id,
        plan.workType,
        plan.languageOfWork,
        plan.workTheme,
        plan.discipline,
        plan.pageCount,
        plan.wishes,
        plan.coverPageData,
        plan.university,
        plan.authorName,
        plan.groupName,
        plan.teacherName,
        plan.subtopics,
        plan.context,
        plan.status,
        plan.file,
        plan.author,
      );
      success();
    } catch (e) {
      console.log(e);
      error();
    } finally {
      setLoading(false);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "План успешно пересоздан!",
    });
  };

  const error = (message?: string) => {
    messageApi.open({
      type: "error",
      content: message || "Ошибка при пересоздании",
    });
  };

  const handleFinish = () => {
    router.push("result/payments");
  };

  const footer = (): JSX.Element => {
    return (
      <Space className={styles.btns} align="end">
        <Button
          className={styles.button}
          loading={loading}
          onClick={regeneratePlan}
          icon={<ReloadOutlined />}
          size="large"
          type="default"
        >
          {resultLang.btns[0]}
        </Button>
        <Button
          onClick={handleFinish}
          className={styles.button}
          size="large"
          type="primary"
        >
          {resultLang.btns[1]}
        </Button>
      </Space>
    );
  };
  const header = (): JSX.Element => {
    return <p style={{ fontWeight: 500 }}>{resultLang.overview}</p>;
  };

  const checkPlanLength = () => {
    if (data.length !== 11) {
      regeneratePlan();
    }
  };

  return (
    <div className={styles.main}>
      {contextHolder}
      <AppHeader />
      <div className="container">
        <div className={styles.main_row}>
          <Space size={20} className={styles.space}>
            <p>{resultLang.title}</p>
            <Image
              className={styles.groza}
              width={40}
              src={resultIcon}
              alt=""
            />
          </Space>
          <div className={styles.space2}>
            <Avatar className={styles.avatar} size="large">
              {store.me.firstName.charAt(0)}
            </Avatar>
            <Card
              className={styles.card}
              bordered
              title={`${resultLang.theme}: ${plan.workTheme}`}
              size="default"
            >
              {myWorkType}
            </Card>
          </div>
          <div className={styles.space2}>
            <Avatar className={styles.avatar} src={logoUrl} size="large" />
            <List
              size="large"
              header={header()}
              footer={footer()}
              bordered
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item key={index} className={styles.li}>
                  {loading ? (
                    <Skeleton
                      style={{ width: "100%" }}
                      paragraph={{ rows: 1 }}
                      active
                    />
                  ) : (
                    <li
                      style={{
                        paddingLeft:
                          index === 2 ||
                          index === 3 ||
                          index === 4 ||
                          index == 6 ||
                          index == 7 ||
                          index == 8
                            ? "30px"
                            : undefined,
                        fontWeight:
                          index === 2 ||
                          index === 3 ||
                          index === 4 ||
                          index == 6 ||
                          index == 7 ||
                          index == 8
                            ? "normal"
                            : 500,
                        listStyle: "inside",
                      }}
                    >
                      {item}
                    </li>
                  )}
                </List.Item>
              )}
              style={{ fontSize: "1.1rem", background: "white", width: "100%" }}
            />
          </div>
          <div className={styles.telegram}>
            <Space>
              <Image className={styles.doubt} src={doubt} alt="" />
              <div className={styles.div}>
                <p>{resultLang.footer[0]}</p>
                <small>{resultLang.footer[1]}</small>
              </div>
            </Space>
            <Button
              href="https://t.me/Ariet_Amanbekov"
              target="_blank"
              type="primary"
              size="large"
            >
              {resultLang.footer[2]}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Result;
