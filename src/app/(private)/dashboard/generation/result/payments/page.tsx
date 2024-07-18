"use client";

import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./payments.module.scss";
import {
  Button,
  Card,
  Input,
  Space,
  Steps,
  Typography,
  Upload,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  CopyFilled,
  CopyOutlined,
  CreditCardOutlined,
  LoadingOutlined,
  PayCircleOutlined,
  SmileOutlined,
  SolutionOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { Context } from "@/app/clientProvider";
import mbank from "../../../../../../../public/icons/mbank.svg";
import odengi from "../../../../../../../public/icons/odengi.svg";
import balance from "../../../../../../../public/icons/balance.svg";
import AppHeader from "@/components/ui/dash-header/AppHeader";
import { useRouter } from "next/navigation";
import doubt from "../../../../../../../public/icons/doubt.svg";

interface Data {
  pageCount: string;
  workType: string;
}

interface Card {
  url: string;
  title: string;
  name: string;
  number: string;
}

const Payments: FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [cost, setCost] = useState<number>(0);
  const { Paragraph } = Typography;
  const [imageData, setImageData] = useState<File | null>(null);
  const { store } = useContext(Context);
  const [word, setWord] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { push, back } = useRouter();

  useEffect(() => {
    fetchData();
    const storedWord = localStorage.getItem("word");
    if (storedWord) {
      setWord(parseInt(storedWord, 10));
    }
  }, []);

  useEffect(() => {
    if (data) {
      switchCase();
    }
  }, [data]);

  const fetchData = () => {
    const values = localStorage.getItem("price");
    if (values) {
      const dataJson = JSON.parse(values);
      setData(dataJson);
    }
  };

  const switchCase = () => {
    if (!data) return;
    switch (true) {
      case data.workType === "1" && data.pageCount === "1":
        setCost(250);
        break;
      case data.workType === "1" && data.pageCount === "3":
        setCost(700);
        break;
      case data.workType === "1" && data.pageCount === "4":
        setCost(1000);
        break;
      case data.workType === "2" && data.pageCount === "1":
        setCost(250);
        break;
      case data.workType === "2" && data.pageCount === "2":
        setCost(400);
        break;
      case data.workType === "2" && data.pageCount === "3":
        setCost(700);
        break;
      case data.workType === "2" && data.pageCount === "4":
        setCost(1000);
        break;
      case data.workType === "3" && data.pageCount === "1":
        setCost(400);
        break;
      case data.workType === "3" && data.pageCount === "2":
        setCost(700);
        break;
      case data.workType === "3" && data.pageCount === "3":
        setCost(1000);
        break;
      case data.workType === "3" && data.pageCount === "4":
        setCost(1300);
        break;
      case data.workType === "4" && data.pageCount === "1":
        setCost(400);
        break;
      case data.workType === "4" && data.pageCount === "2":
        setCost(500);
        break;
      case data.workType === "4" && data.pageCount === "3":
        setCost(750);
        break;
      case data.workType === "4" && data.pageCount === "4":
        setCost(1100);
        break;
      default:
        setCost(10);
        break;
    }
  };

  const cardList: Card[] = [
    {
      url: mbank,
      title: "Mbank",
      name: "Сапарбек уулу Ариет",
      number: "+996 (702)-160-703",
    },
    {
      url: odengi,
      title: "О! Деньги",
      name: "Сапарбек уулу Ариет",
      number: "+996 (702)-160-703",
    },
    {
      url: balance,
      title: "Баланс",
      name: "Сапарбек уулу Ариет",
      number: "+996 (702)-160-703",
    },
  ];

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageData(e.target.files[0]);
    }
  };

  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageData || typeof word !== "number") {
      message.error("Пожалуйста, выберите файл и убедитесь, что тема задано.");
      return;
    }
    setLoading(true);

    try {
      await store.payments(imageData, "pending", word);
      if (store.status.status === 201) {
        localStorage.removeItem("price");
        localStorage.removeItem("workPlans");
        localStorage.removeItem("word");
        message.success("Файл успешно загружен");
        push("/");
      } else {
        errorMessage();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: store.status.statusText,
    });
  };

  return (
    <div className={styles.main}>
      {contextHolder}
      <AppHeader />
      <div className="container">
        <div className={styles.main_row}>
          <p className={styles.price}>
            К оплате: <span className="active">{cost} сом</span>
          </p>
          <Steps
            className={styles.steps}
            items={[
              {
                title: "Выберите реквизиты",
                status: "finish",
                icon: <CreditCardOutlined />,
              },
              {
                title: "Оплатите",
                status: "finish",
                icon: <PayCircleOutlined />,
              },
              {
                title: "Отправьте чек",
                status: "finish",
                icon: <UploadOutlined />,
              },
              {
                title: "Проверка займет 5 минут",
                status: "finish",
                icon: <CheckCircleOutlined />,
              },
              {
                title: "Готово",
                status: "finish",
                icon: <SmileOutlined />,
              },
            ]}
          />
          <div className={styles.cards}>
            {cardList.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                className={styles.card}
                extra={
                  <Paragraph
                    className={styles.copyable}
                    copyable={{
                      text: item.number,
                      icon: [
                        <CopyOutlined
                          style={{ fontSize: "1.3rem" }}
                          key="copy-outlined"
                        />,
                        <CopyFilled key="copy-filled" />,
                      ],
                      tooltips: ["Скопировать", "Скопировано!"],
                    }}
                  >
                    Скопировать
                  </Paragraph>
                }
              >
                <div className={styles.details}>
                  <Image
                    width={70}
                    src={item.url}
                    alt={item.title}
                    key={item.title}
                  />
                  <div key={`${item.title}-details`}>
                    <p key={`${item.title}-number`}>{item.number}</p>
                    <small key={`${item.title}-name`}>{item.name}</small>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className={styles.uploadBlock}>
            <form onSubmit={onFinish}>
              <input
                id="file"
                onChange={handleImage}
                type="file"
                name="photo"
                className={styles.htmlInput}
              />
              <div className={styles.btns}>
                <Space>
                  <Button
                    size="large"
                    onClick={() => {
                      const file = document.getElementById("file");
                      file?.click();
                    }}
                    type="default"
                  >
                    Выбрать файл
                  </Button>
                  <p>{imageData?.name}</p>
                </Space>
                <Button
                  loading={loading}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className={styles.submitBtn}
                >
                  Отправить
                </Button>
              </div>
            </form>
          </div>
          <div className={styles.telegram}>
            <Space>
              <Image className={styles.doubt} src={doubt} alt="" />
              <div className={styles.div}>
                <p>
                  Сомневаешься в качестве работы, <br /> сгенерированной
                  роботом?
                </p>
                <small>Свяжитесь с нами на прямую</small>
              </div>
            </Space>
            <Button
              href="https://t.me/@Ariet_Amanbekov"
              target="_blank"
              type="primary"
              size="large"
              className={styles.button}
            >
              Перейти в Telegram
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
