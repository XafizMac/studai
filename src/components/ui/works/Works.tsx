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
import { useLang } from "@/hooks/useLang";

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
  const { lang, translations } = useLang();
  const tableLang = translations[lang].dashboard;

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
      label: tableLang.table.actions[0],
      icon: <EyeOutlined />,
      disabled: record.status === "approved" ? false : true,
      onClick: () => {
        const url = `/dashboard/work?file=${encodeURIComponent(
          record.file
        )}&subtopics=${encodeURIComponent(
          record.subtopics.join(", ")
        )}&theme=${encodeURIComponent(record.workTheme)}`;
        push(url);
      },
    },
    {
      key: "2",
      label: tableLang.table.actions[1],
      icon: <DownloadOutlined />,
      disabled: record.status === "approved" ? false : true,
      onClick: () => downloadFile(record.file),
    },
    { type: "divider" },
    {
      key: "3",
      label: tableLang.table.actions[2],
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
      title: tableLang.table.head[0],
      dataIndex: "name",
      key: "name",
    },
    {
      title: tableLang.table.head[1],
      dataIndex: "page",
      key: "page",
    },
    {
      title: tableLang.table.head[2],
      dataIndex: "workType",
      key: "workType",
    },
    {
      title: tableLang.table.head[3],
      key: "language",
      dataIndex: "language",
    },
    {
      title: tableLang.table.head[4],
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
              ? tableLang.table.status[0]
              : record.status === "rejected"
              ? tableLang.table.status[2]
              : record.status === "pending"
              ? tableLang.table.status[1]
              : tableLang.table.status[1]
          }
        />
      ),
    },
    {
      title: tableLang.table.head[5],
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
            {translations[lang].dashboard.empty}
          </p>
        </div>
      ) : (
        <div className={styles.tableScroll}>
          <p className={styles.title}>
            {tableLang.workCount} ({workData.length})
          </p>
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
