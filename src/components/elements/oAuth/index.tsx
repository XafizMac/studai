import { Context } from "@/app/clientProvider";
import { GoogleOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import { useContext, useState } from "react";

export default function OAuth() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const { store } = useContext(Context);
  const oAuth = async () => {
    setGoogleLoading(true);
    try {
      const response = await store.oAuth();
      console.log(response?.data.authorizationUrl);
      window.location.href = await response?.data.authorizationUrl;
    } catch (e) {
      console.log(e);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Badge.Ribbon text="Скоро!" color="orange">
      <Button
        disabled
        onClick={oAuth}
        size="large"
        icon={<GoogleOutlined />}
        type="default"
        loading={googleLoading}
        style={{ width: "100%", fontWeight: 600 }}
      >
        Войти через Google
      </Button>
    </Badge.Ribbon>
  );
}
