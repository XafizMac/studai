import { FC } from "react";
import styles from "./generation.module.scss";
import { Breadcrumb, Button } from "antd";
import { ArrowLeftOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";

const Generation: FC = () => {
    return (
        <div className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    generation page
                </div>
            </div>
        </div>
    )
}

export default Generation;