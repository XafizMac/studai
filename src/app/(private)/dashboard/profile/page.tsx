import { FC } from "react";
import styles from "./profile.module.scss";

const Profile: FC = () => {
    return (
        <div className={styles.main}>
            <div className="container">
                <div className={styles.main_row}>
                    {/* Container */}
                    Мой личный кабинет
                </div>
            </div>
        </div>
    );
}

export default Profile;