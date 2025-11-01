"use client"

import {FormEvent, useState} from "react";
import MainInput from "@/components/Inputs/MainInput";
import HideInput from "@/components/Inputs/HideInput";
import {BackEndResponse} from "@/types";

export default function ChangePassword() {

    const [currentEmail, setCurrentEmail] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateCurrentEmail = (currentEmail:string): string | null => {
        if (!currentEmail.trim())  {
            return ('Пожалуйста, введите вашу текущую почту');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(currentEmail)) {
            return ('Пожалуйста, введите вашу текущую почту корректно')
        }
        return null;
    }

    const validateNewEmail = (newEmail:string): string | null => {
        if (!newEmail.trim())  {
            return ('Пожалуйста, введите вашу новую почту');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            return ('Пожалуйста, введите новую почту корректно ')
        }

        return null;
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const validateCurrentEmailErrors:string | null = validateCurrentEmail(currentEmail);
        if (validateCurrentEmailErrors) {
            newErrors.currentEmail = validateCurrentEmailErrors;
        }

        const validateNewEmailErrors:string | null = validateNewEmail(newEmail);
        if (validateNewEmailErrors) {
            newErrors.newEmail = validateNewEmailErrors;
        }

        return newErrors;
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrors({});

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentEmail: currentEmail,
                    newEmail: newEmail,
                    password: password,
                }),
            });

            const data = (await response.json()) as BackEndResponse;

            if (response.ok) {
                alert('Вы успешно сменили почту')
            } else {
                setErrors({ form: data.error || "Ошибка смены почты" });
            }
        } catch (err) {
            setErrors({ form: "Ошибка соединения с сервером"});
            console.error(err);
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-white mb-2">
                Смена почты
            </h1>
            <p className="text-gray-400 mb-8">
                Рекомендуем использовать проверенных почтовых операторов
            </p>

            <form className="space-y-8 max-w-md" onSubmit={handleSubmit}>
                <div className="relative">
                    <MainInput
                        id={'current_email'}
                        label={'Текущий Email'}
                        value={currentEmail}
                        onChange={setCurrentEmail}
                        error={errors.currentEmail}
                    />
                </div>
                <div className="relative">
                    <MainInput
                        id={'new_email'}
                        label={'Новый Email'}
                        value={newEmail}
                        onChange={setNewEmail}
                        error={errors.newEmail}
                    />
                </div>
                <div className="relative">
                    <HideInput
                        id={'password'}
                        label={'Пароль от аккаунта'}
                        value={password}
                        onChange={setPassword}
                        error={errors.password}
                    />
                </div>

                <button type="submit"  className="w-full myButtonColor py-3 text-base font-bold text-black  rounded-lg transition-all">
                    Сохранить изменения
                </button>
            </form>
        </>
    );
}