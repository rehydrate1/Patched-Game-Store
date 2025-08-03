"use client";

import styles from './ServerError.module.scss';

interface ServerErrorProps {
    message: string | null;
}

export default function ServerError({ message }: ServerErrorProps) {
    // Если сообщения нет, компонент не рендерит ничего.
    if (!message) {
        return null;
    }

    return (
        <div
            className={`${styles.errorMessage} p-3 mb-4 text-sm font-semibold text-red-600 bg-red-100 rounded-lg`}
            role="alert"
        >
            <p>{message}</p>
        </div>
    );
}