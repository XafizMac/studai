"use client";

import { FC } from "react";
import styles from "./work.module.scss";
import AppHeader from "@/components/ui/dash-header/AppHeader";
import { Anchor, Button, Input, Space } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const Work: FC = () => {
  const params = useSearchParams();
  const file = params.get("file");
  const docs = [
    { uri: 'https://docs.google.com/document/d/e/2PACX-1vSs-ELgCkLvxvnXjPpPhI4HrFFJqrzJJg_aeTWsgV3k2AQfmtsCPwDM-WfW3HYzkyjf9u-Os5yNWYxl/pub' }
  ];

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
                title: "Basic demo",
              },
              {
                key: "2",
                href: "#components-anchor-demo-static",
                title: "Static demo",
              },
              {
                key: "3",
                href: "#api",
                title: "API",
                children: [
                  {
                    key: "4",
                    href: "#anchor-props",
                    title: "Anchor Props",
                  },
                  {
                    key: "5",
                    href: "#link-props",
                    title: "Link Props",
                  },
                ],
              },
            ]}
          />
        </div>
        <div className={styles.document}>
          <div className={styles.theme}>
            <div className={styles.title_btns}>
              <p className={styles.title}>Тема</p>
              <div className={styles.btns}>
                <Space>
                  <Button icon={<PlusOutlined />}>Создать новый</Button>
                  <Button type="primary" icon={<UploadOutlined />}>
                    Экпорт
                  </Button>
                </Space>
              </div>
            </div>
            <div className={styles.themeContainer}>История языка C#</div>
          </div>
          <div className={styles.paperScrollable}>
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Work;
