'use client';

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../layout';

const ResendActivationPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { store } = useContext(Context)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            store.resend_activation(email);
            setMessage('Активационное письмо отправлено на вашу электронную почту.');
        } catch (error) {
            setMessage('Ошибка при отправке активационного письма. Пожалуйста, попробуйте снова.');
        }
    };

    return (
        <div>
            <h1>Повторная отправка активационного письма</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите вашу электронную почту"
                    required
                />
                <button type="submit">Отправить</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResendActivationPage;
