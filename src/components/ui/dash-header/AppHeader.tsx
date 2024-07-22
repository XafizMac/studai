"use client";

import { Button } from "antd";
import React from "react";
import styles from "./header.module.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/useLang";

export default function AppHeader() {
  const router = useRouter();
  const { lang, translations } = useLang();
  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.btn}>
      <Button
        onClick={goBack}
        iconPosition="start"
        icon={<ArrowLeftOutlined />}
      >
        {translations[lang].backbtn}
      </Button>
    </div>
  );
}
