"use client";

import { Badge, Button, Dropdown, message, Table, TableProps } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import emptyImg from "../../../../public/icons/empty.svg";
import Image from "next/image";
import styles from "./works.module.scss";
import { Context } from "@/app/clientProvider";
import {
  DeleteOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Work } from "@/models/plan/Plan";
import { motion } from "framer-motion";
import { MenuProps } from "antd";
import { useRouter } from "next/navigation";

interface DataType {
  key: string;
  name: string;
  page: string;
  workType: string;
  language: string;
  status: string;
  file: string;
  id: number;
  subtopics: string[];
  workTheme: string;
}

const Works: FC = () => {
  const { store } = useContext(Context);
  const [empty, setEmpty] = useState<boolean>(true);
  const [workData, setWorkData] = useState<DataType[]>([]);
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!store.isAuth) {
      store.checkAuth();
    }
  }, [store.isAuth]);

  useEffect(() => {
    const fetchData = async () => {
      const response: Work[] = await store.getWorks();
      const transformedData: DataType[] = response.map((work, index) => ({
        key: index.toString(),
        name: work.workTheme,
        page: work.pageCountDisplay,
        workType: work.workTypeDisplay,
        language: work.languageOfWorkDisplay,
        status: work.status,
        file: work.file,
        id: work.id,
        subtopics: work.subtopics,
        workTheme: work.workTheme,
      }));
      setWorkData(transformedData.reverse());
      setEmpty(transformedData.length === 0);
    };
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [store]);

  const generateMenuItems = (record: DataType): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            const url = `/dashboard/generation/result/work?file=${encodeURIComponent(record.file)}&subtopics=${encodeURIComponent(record.subtopics.join(', '))}&theme=${encodeURIComponent(record.workTheme)}`;
            push(url);
          }}
        >
          Посмотреть
        </p>
      ),
      icon: <EyeOutlined />,
      disabled: record.status === "approved" ? false : true,
    },
    {
      key: "2",
      label: "Скачать",
      icon: <DownloadOutlined />,
      disabled: record.status === "approved" ? false : true,
      onClick: () => downloadFile(record.file),
    },
    { type: "divider" },
    {
      key: "3",
      label: "Удалить",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => deleteRecord(record.id),
    },
  ];

  const downloadFile = (file: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.setAttribute("download", "StudaiWor.docx");
    document.body.appendChild(link);
    link.click();
    console.log(`Downloading file: ${file}`);
  };

  const deleteRecord = async (id: number) => {
    try {
      const response = await store.deleteWork(id.toString());
      success();
    } catch (err) {
      error();
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Страница",
      dataIndex: "page",
      key: "page",
    },
    {
      title: "Тип работы",
      dataIndex: "workType",
      key: "workType",
    },
    {
      title: "Язык работы",
      key: "language",
      dataIndex: "language",
    },
    {
      title: "Статус",
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <Badge
          status={
            record.status === "approved"
              ? "success"
              : record.status === "rejected"
              ? "error"
              : record.status === "pending"
              ? "processing"
              : "processing"
          }
          text={
            record.status === "approved"
              ? "Готово"
              : record.status === "rejected"
              ? "Отклонен"
              : record.status === "pending"
              ? "Ожидание"
              : "Ожидание"
          }
        />
      ),
    },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{ items: generateMenuItems(record) }}
        >
          <Button shape="circle" type="text">
            <EllipsisOutlined style={{ fontSize: "1.5rem" }} />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Успешное удаление работы",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка при удалении работы",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.main}
    >
      {contextHolder}
      {empty ? (
        <div className={styles.empty}>
          <Image src={emptyImg} alt="" />
          <p>
            Однажды это пространство будет наполнено мозговыми штурмами и яркими
            идеями
          </p>
        </div>
      ) : (
        <div className={styles.tableScroll}>
          <p className={styles.title}>Все работы ({workData.length})</p>
          <Table
            style={{
              minWidth: 890,
            }}
            className={styles.table}
            columns={columns}
            dataSource={workData}
            pagination={false}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Works;
