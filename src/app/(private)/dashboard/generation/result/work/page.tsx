"use client";

import { FC, useEffect, useState } from "react";
import styles from "./work.module.scss";
import AppHeader from "@/components/ui/dash-header/AppHeader";
import { Anchor, Button, Input, Space } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import DocViewer, {
  DocViewerRenderers,
  IDocument,
  MSDocRenderer,
} from "@cyntler/react-doc-viewer";

const Work: FC = () => {
  const params = useSearchParams();
  const [subtopicData, setSubtopicsData] = useState<string[]>([]);
  const file = params.get("file");
  const theme = params.get("theme");
  const subtopicParam = params.get("subtopics");
  const subtopic = subtopicParam ? subtopicParam.split(",") : [];
  const docs: IDocument[] = [
    { uri: file ?? "", fileType: "docx", fileName: "Документ"}
  ];

  const handleDownloadDoc = (file: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.setAttribute("download", "StudaiWor.docx");
    document.body.appendChild(link);
    link.click();
    console.log(`Downloading file: ${file}`);
  };

  return (
    <div className={styles.main}>
      <AppHeader />
      <div className={styles.main_row}>
        <div className={styles.navigation}>
          <p>Навигация</p>
          <Anchor
            className={styles.anchor}
            affix={false}
            items={[
              {
                key: "1",
                href: "#components-anchor-demo-basic",
                title: <span style={{fontSize: '1.1rem', fontWeight: 400}}>{subtopic[0]}</span>,
              },
              {
                key: "2",
                href: "#components-anchor-demo-static",
                title: <span style={{fontSize: '1.1rem', fontWeight: 400}}>{subtopic[1]}</span>,
                children: [
                  {
                    key: "3",
                    href: "#components-anchor-demo-dynamic",
                    title: subtopic[2],
                  },
                  {
                    key: "4",
                    href: "#components-anchor-demo-affix",
                    title: subtopic[3],
                  },
                  {
                    key: "5",
                    href: "#components-anchor-demo-auto-focus",
                    title: subtopic[4],
                  }
                ],
              },
              {
                key: "6",
                href: "#api",
                title: <span style={{fontSize: '1.1rem', fontWeight: 400}}>{subtopic[5]}</span>,
                children: [
                  {
                    key: "7",
                    href: "#anchor-props",
                    title: subtopic[6],
                  },
                  {
                    key: "8",
                    href: "#link-props",
                    title: subtopic[7],
                  },
                  {
                    key: "9",
                    href: "#anchor-event",
                    title: subtopic[8],
                  }
                ],
              },
              {
                key: "10",
                href: "#FAQ",
                title: <span style={{fontSize: '1.1rem', fontWeight: 400}}>{subtopic[9]}</span>,
              },
              {
                key: "11",
                href: "#examples",
                title: <span style={{fontSize: '1.1rem', fontWeight: 400}}>{subtopic[10]}</span>,
              }
            ]}
          />
        </div>
        <div className={styles.document}>
          <div className={styles.theme}>
            <div className={styles.title_btns}>
              <p className={styles.title}>Тема</p>
              <div className={styles.btns}>
                <Space>
                  <Button href="/dashboard/generation" icon={<PlusOutlined />}>
                    Создать новый
                  </Button>
                  <Button
                    onClick={() => handleDownloadDoc(docs[0].uri)}
                    type="primary"
                    icon={<UploadOutlined />}
                  >
                    Экпорт
                  </Button>
                </Space>
              </div>
            </div>
            <div className={styles.themeContainer}>{theme}</div>
          </div>
          <div className={styles.paperScrollable}>
            <DocViewer style={{width: "100%"}} pluginRenderers={DocViewerRenderers} documents={docs} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Work;
