import {
  CameraOutlined,
  CloseOutlined,
  DeleteOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

interface WebcamProps {
  getScreenshot: () => string | null;
}

const Camera = () => {
  const webcamRef = useRef<WebcamProps | null>(null);
  const [url, setUrl] = React.useState<string | null>();

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc !== null) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        background: "black",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {url ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img src={url} alt="Screenshot" />
        </div>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            videoConstraints={{
              facingMode: "environment",
            }}
            style={{
              width: "100%",
              height: "100vh",
            }}
          />
          <Button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 9999,
              color: "white",
            }}
            type="text"
            icon={<CloseOutlined />}
            size="large"
          />
        </>
      )}

      {!url ? (
        <Button
          size="large"
          type="primary"
          shape="circle"
          icon={<CameraOutlined />}
          onClick={capturePhoto}
          style={{
            width: "70px",
            height: "70px",
            alignSelf: "center",
            transform: "translateY(-50%)",
          }}
        />
      ) : (
        <Space
          size={15}
          style={{ alignSelf: "center", transform: "translateY(-100%)" }}
        >
          <Button
            onClick={() => setUrl(null)}
            danger
            type="primary"
            icon={<DeleteOutlined />}
            iconPosition="end"
            size="large"
          >
            Удалить
          </Button>
          <Button
            type="primary"
            iconPosition="end"
            size="large"
            icon={<SendOutlined />}
            onClick={() => console.log("Send photo" + url)}
          >
            Отправить
          </Button>
        </Space>
      )}
    </div>
  );
};

export default Camera;
