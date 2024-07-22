"use client";

import { FC, useContext, useEffect, useState } from "react";
import styles from "./generation.module.scss";
import {
  Button,
  Form,
  Input,
  Space,
  message,
  Select,
  Checkbox,
  FloatButton,
} from "antd";
import { useRouter } from "next/navigation";
import { Context } from "@/app/clientProvider";
import type { CheckboxProps, FormProps } from "antd";
import { clamp, motion } from "framer-motion";
import { CustomerServiceOutlined, StarOutlined } from "@ant-design/icons";
import Image from "next/image";
import generateIcon from "../../../../../public/icons/generate.svg";
import AppHeader from "@/components/ui/dash-header/AppHeader";
import { useLang } from "@/hooks/useLang";

type FieldType = {
  workType: string;
  languageOfWork: string;
  workTheme: string;
  discipline: string;
  pageCount: string;
  wishes: string;
  coverPageData: string;
  university: string;
  authorName: string;
  groupName: string;
  teacherName: string;
};

const Generation: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isCheckbox, setCheckbox] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { store } = useContext(Context);
  const { push } = useRouter();
  const { lang, translations } = useLang();
  const genLang = translations[lang].generation;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.checkAuth();
    }
  }, [store.isAuth, store]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    if (isCheckbox) {
      values.coverPageData = "1";
    } else {
      values.coverPageData = "2";
    }
    try {
      const result = await store.generatePlan(
        values.workType,
        values.languageOfWork,
        values.workTheme,
        values.discipline,
        values.pageCount,
        values.wishes,
        values.coverPageData,
        values.university,
        values.authorName,
        values.groupName,
        values.teacherName,
      );
      localStorage.setItem("price", JSON.stringify(values));
      console.log();
      if (store.status.status == 201) {
        success();
        push("/dashboard/generation/result");
      } else {
        error();
      }
    } catch (e) {
      console.error("Error:", e);
      error();
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setCheckbox(!isCheckbox);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "План успешно создан!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Не удалось подключиться к интернету",
    });
  };

  return (
    <div className={styles.main}>
      {contextHolder}
      <AppHeader />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={styles.main_row}
        >
          <Space>
            <p style={{ fontSize: clamp(0.1, 30, 40), fontWeight: 500 }}>
              {genLang.title}
            </p>
            <Image className={styles.title_icon} src={generateIcon} alt="" />
          </Space>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="on"
            className={styles.forms}
          >
            <div>
              <Form.Item<FieldType>
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, выберите тип работы!",
                  },
                ]}
                name="workType"
              >
                <Select
                  size="large"
                  defaultValue={genLang.type}
                  style={{ width: "100%" }}
                  options={[
                    {
                      value: "1",
                      label: translations[lang].mainpage.worktypes[0],
                    },
                    {
                      value: "2",
                      label: translations[lang].mainpage.worktypes[2],
                    },
                    {
                      value: "3",
                      label: translations[lang].mainpage.worktypes[3],
                    },
                    {
                      value: "4",
                      label: translations[lang].mainpage.worktypes[1],
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <Space className={styles.space}>
              <div>
                <p>{genLang.theme[0]}</p>
                <Form.Item<FieldType>
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите тему работы!",
                    },
                  ]}
                  name="workTheme"
                >
                  <Input
                    type="text"
                    placeholder={genLang.theme[1]}
                    size="large"
                  />
                </Form.Item>
              </div>
              <div>
                <p>{genLang.discipline[0]}</p>
                <Form.Item<FieldType>
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите дисциплину!",
                    },
                  ]}
                  name="discipline"
                >
                  <Input
                    type="text"
                    placeholder={genLang.discipline[1]}
                    size="large"
                  />
                </Form.Item>
              </div>
            </Space>
            <div>
              <p>{genLang.overview[0]}</p>
              <Form.Item<FieldType> name={"wishes"}>
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder={genLang.overview[1]}
                  size="large"
                />
              </Form.Item>
            </div>
            <Space className={styles.langSpace}>
              <Space className={styles.langSpaceBlock}>
                <div>
                  <p>{genLang.lang}</p>
                  <Form.Item<FieldType>
                    name="languageOfWork"
                    rules={[
                      { required: true, message: "Пожалуйста, выберите язык!" },
                    ]}
                  >
                    <Select
                      size="large"
                      defaultValue={genLang.lang}
                      defaultActiveFirstOption
                      style={{ width: "100%" }}
                      options={[
                        { value: "2", label: "Русский" },
                        { value: "1", label: "Кыргызча" },
                        { value: "3", label: "English" },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div>
                  <p>{genLang.page[0]}</p>
                  <Form.Item<FieldType>
                    name="pageCount"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, выберите количество!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      defaultValue={genLang.page[0]}
                      options={[
                        {
                          value: "1",
                          label: `1-10 ${genLang.page[1]}`,
                        },
                        {
                          value: "2",
                          label: `10-20 ${genLang.page[1]}`,
                        },
                        {
                          value: "3",
                          label: `20-30 ${genLang.page[1]}`,
                        },
                        {
                          value: "4",
                          label: `30-40 ${genLang.page[1]}`,
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Space>

              <Form.Item<FieldType> name="coverPageData">
                <Checkbox
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                >
                  {genLang.titlepage}
                </Checkbox>
              </Form.Item>
            </Space>

            {isCheckbox && (
              <div className={styles.space}>
                <p style={{ marginBottom: 20, fontSize: "1.3rem" }}>
                  {genLang.details}
                </p>
                <Space className={styles.space}>
                  <div>
                    <p>{genLang.studant[0]}</p>
                    <Form.Item<FieldType>
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, введите ФИО студента!",
                        },
                      ]}
                      name="authorName"
                    >
                      <Input
                        type="text"
                        placeholder={genLang.studant[1]}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <p>{genLang.tutor[0]}</p>
                    <Form.Item<FieldType>
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, введите имя преподавателя !",
                        },
                      ]}
                      name="teacherName"
                    >
                      <Input
                        type="text"
                        placeholder={genLang.tutor[1]}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </Space>
                <div>
                  <p>{genLang.group[0]}</p>
                  <Form.Item<FieldType>
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите группа студента!",
                      },
                    ]}
                    name="groupName"
                  >
                    <Input
                      type="text"
                      placeholder={genLang.group[1]}
                      size="large"
                    />
                  </Form.Item>
                </div>
                <div>
                  <p>{genLang.university[0]}</p>
                  <Form.Item<FieldType>
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите учебное заведение!",
                      },
                    ]}
                    name="university"
                  >
                    <Input
                      type="text"
                      placeholder={genLang.university[1]}
                      size="large"
                    />
                  </Form.Item>
                </div>
              </div>
            )}

            <div className={styles.btn}>
              <Form.Item>
                <Button
                  icon={<StarOutlined />}
                  iconPosition="start"
                  className={styles.button}
                  loading={loading}
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  {genLang.button}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default Generation;
