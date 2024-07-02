'use client';

import { Table } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import emptyImg from "../../../../public/icons/empty.svg";
import Image from "next/image";
import styles from "./works.module.scss";
import { Context } from "@/app/clientProvider";

const Works: FC = () => {
    const { store } = useContext(Context);
    const [empty, setEmpty] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            await store.getWorks();
            setEmpty(false);
        }
        fetchData();
    }, [])

    return (
        <div>
            {!empty ? (
                <div className={styles.empty}>
                    <Image src={emptyImg} alt="" />
                    <p>Однажды это пространство будет наполнено мозговыми штурмами и яркими идеями</p>
                </div>
            ) : (
                <Table></Table>
            )}
        </div>
    )
}

export default Works;