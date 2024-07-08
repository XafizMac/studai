"use client";

import { Table } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import emptyImg from "../../../../public/icons/empty.svg";
import Image from "next/image";
import styles from "./works.module.scss";
import { Context } from "@/app/clientProvider";

const Works: FC = () => {
  const { store } = useContext(Context);
  const [empty, setEmpty] = useState<boolean>(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await store.getWorks();
      console.log(response);
      
      setEmpty(false);
    };
    fetchData();
    // Установка интервала для повторения запроса каждые 5 секунд
    const interval = setInterval(fetchData, 5000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.main}>
      {!empty ? (
        <div className={styles.empty}>
          <Image src={emptyImg} alt="" />
          <p>
            Однажды это пространство будет наполнено мозговыми штурмами и яркими
            идеями
          </p>
        </div>
      ) : (
        <Table></Table>
      )}
    </div>
  );
};

export default Works;
