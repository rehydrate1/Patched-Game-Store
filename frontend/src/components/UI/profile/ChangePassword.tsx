"use client"

import React, {useState} from "react";
import MainInput from "@/components/Inputs/MainInput";
import {BackEndResponse} from "@/types";

export default function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateCurrentPassword = (currentPassword:string): string | null => {
        if (!currentPassword.trim())  {
            return ('Пожалуйста введите ваш текущий пароль');
        }

        return null;
    }

    const validateNewPassword = (newPassword:string): string | null => {
        if (!newPassword.trim())  {
            return ('Пожалуйста введите ваш новый пароль');
        }

        if (newPassword.length < 8)  {
            return (`Пароль должен содержать минимум 8 символов (сейчас ${newPassword.length})`);
        }

        if (newPassword.length > 25){
            return (`Пароль может быть максимум 25 символов (сейчас ${newPassword.length})`);
        }

        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*.]$/;
        if(!passwordRegex.test(newPassword)) {
            return ('Пароль может содержать только латинские буквы, цифры и некоторые спец.символы')
        }

        return null;
    }

    const validateConfirmPassword = (newPassword:string, confirmPassword:string): string | null => {
        if (!newPassword.trim())  {
            return ('Пожалуйста подтвердите ваш новый пароль');
        }

        if (newPassword != confirmPassword)  {
            return ('Подтверждение не совпадает с вашим новым паролем');
        }

        return null;
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const currentPasswordError:string | null = validateCurrentPassword(currentPassword);
        if (currentPasswordError) {
            newErrors.currentPassword = currentPasswordError;
        }

        const newPasswordError = validateNewPassword(newPassword);
        if (newPasswordError) {
            newErrors.newPassword = newPasswordError;
        }

        const confirmPasswordError = validateConfirmPassword(confirmPassword, newPassword);
        if (confirmPasswordError) {
            newErrors.confirmPassword = confirmPasswordError;
        }

        return newErrors;
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const payload = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: newPassword,
        }

        try {
            const response = await fetch("http://localhost:8082/api/change/password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = (await response.json()) as BackEndResponse;

            if (response.ok) {
                alert('Вы успешно сменили пароль (заменить эту хуйню)')
            } else {
                setErrors({ form: data.error || "Ошибка смены пароля" });
            }
        } catch (err) {
            setErrors({ form: "Ошибка соединения с сервером" });
            console.error(err);
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-white mb-2">
                Смена пароля
            </h1>
            <p className="text-gray-400 mb-8">
                Рекомендуем использовать сложный и уникальный пароль
            </p>

            <form className="space-y-8 max-w-md" onSubmit={handleSubmit}>
                <div className="relative">
                    <MainInput
                        id={'current_password'}
                        label={'Текущий пароль'}
                        value={currentPassword}
                        onChange={setCurrentPassword}
                        className={`mt-3`}
                        error={errors.currentPassword}
                    />
                </div>
                <div className="relative">
                    <MainInput
                        id={'new_password'}
                        label={'Новый пароль'}
                        value={newPassword}
                        onChange={setNewPassword}
                        className={`mt-3`}
                        error={errors.newPassword}
                    />
                </div>
                <div className="relative">
                    <MainInput
                        id={'confirm_password'}
                        label={'Подтвердите пароль'}
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        className={`mt-3`}
                        error={errors.confirmPassword}
                    />
                </div>

                <button type="submit"  className="w-full myButtonColor py-3 text-base font-bold text-black  rounded-lg transition-all">
                    Сохранить изменения
                </button>
            </form>
        </>
    );
}