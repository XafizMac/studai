"use client";

import { FC } from "react";
import styles from "./work.module.scss";
import AppHeader from "@/components/ui/dash-header/AppHeader";
import { Anchor, Button, Space } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import DocViewer, {
  DocViewerRenderers,
  IDocument,
} from "@cyntler/react-doc-viewer";
import { useLang } from "@/hooks/useLang";

const Work: FC = () => {
  const { lang, translations } = useLang();
  const params = useSearchParams();
  const file = params.get("file");
  const theme = params.get("theme");
  const subtopicParam = params.get("subtopics");
  const subtopic = subtopicParam ? subtopicParam.split(",") : [];
  const docs: IDocument[] = [
    { uri: file ?? "", fileType: "docx", fileName: theme ? theme : "" },
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
          <p>{translations[lang].work.navigation}</p>
          <Anchor
            className={styles.anchor}
            affix={false}
            items={[
              {
                key: "1",
                href: "#components-anchor-demo-basic",
                title: (
                  <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>
                    {subtopic[0]}
                  </span>
                ),
              },
              {
                key: "2",
                href: "#components-anchor-demo-static",
                title: (
                  <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>
                    {subtopic[1]}
                  </span>
                ),
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
                  },
                ],
              },
              {
                key: "6",
                href: "#api",
                title: (
                  <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>
                    {subtopic[5]}
                  </span>
                ),
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
                  },
                ],
              },
              {
                key: "10",
                href: "#FAQ",
                title: (
                  <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>
                    {subtopic[9]}
                  </span>
                ),
              },
              {
                key: "11",
                href: "#examples",
                title: (
                  <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>
                    {subtopic[10]}
                  </span>
                ),
              },
            ]}
          />
        </div>
        <div className={styles.document}>
          <div className={styles.theme}>
            <div className={styles.title_btns}>
              <p className={styles.title}>{translations[lang].work.theme}</p>
              <div className={styles.btns}>
                <Space>
                  <Button href="/dashboard/generation" icon={<PlusOutlined />}>
                    {translations[lang].work.btns[0]}
                  </Button>
                  <Button
                    onClick={() => handleDownloadDoc(docs[0].uri)}
                    type="primary"
                    icon={<UploadOutlined />}
                  >
                    {translations[lang].work.btns[1]}
                  </Button>
                </Space>
              </div>
            </div>
          </div>
          <div className={styles.paperScrollable}>
            <DocViewer
              style={{ width: "100%" }}
              pluginRenderers={DocViewerRenderers}
              documents={docs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Work;
