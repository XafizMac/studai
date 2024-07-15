"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { back } = useRouter();
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    }}>
      <Result
        status="404"
        title="404"
        subTitle="К сожалению, страница, которую вы посетили, не существует."
        extra={
          <Button type="primary" onClick={() => back()}>
            Назад
          </Button>
        }
      />
    </div>
  );
}
