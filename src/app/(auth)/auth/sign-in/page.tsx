"use client"

import Image from "next/image"
import styles from "./signin.module.scss"
import logo from "../../../../../public/logo.svg"
import { useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Button, Input } from "antd"

export default function SignIn() {

    const { register, handleSubmit } = useForm()

    // useEffect(() => {
    //     postUser()
    // }, [])

    // const postUser = async () => {
    //     try {
    //         const response = await axios.post("http://api.studai.online/api/users", {
    //             email: "hafizfullstack@gmail.com",
    //             firstName: "Hafiz",
    //             lastName: "Joldoshov",
    //             password: "Hafiz123Studai2024"
    //         })
    //         console.log(response.data);

    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    const onSubmit = (data: any) => {
        console.log(data);
        alert()
    }

    return (
        <div className={styles.main}>
            <div className={styles.form}>
                <Image width={80} src={logo} alt="Logo" />
                <form onSubmit={handleSubmit(onSubmit)} className={styles.formInput}>
                    <p className={styles.title}>Регистрация</p>
                    {/* <div> */}
                        {/* <div> */}
                            <small>Электронная почта</small>
                            <input {...register('e-mail', { required: "This field is required" })} type="email" placeholder="e-mail" />
                        {/* </div> */}
                        {/* <div>
                            <small>Имя</small>
                            <Input placeholder="Имя" size="large" />
                        </div>
                        <div>
                            <small>Фамилия</small>
                            <Input placeholder="Фамилия" size="large" />
                        </div>
                        <div>
                            <small>Пароль</small>
                            <Input type="password" placeholder="Пароль" size="large" />
                        </div> */}
                        {/* <Button size="large" type="primary">Зарегистрироваться</Button> */}
                        <button type="submit">Зарегистрироваться</button>
                    {/* </div> */}
                </form>
            </div>




            {/* Image */}
            <div className={styles.background}>
            </div>
        </div>
    )
}