"use client"



import {useState} from "react";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";

export default function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    return (

        <>
            <h1 className="text-3xl font-bold text-white mb-2">
                Смена пароля
            </h1>
            <p className="text-gray-400 mb-8">
                Рекомендуем использовать сложный и уникальный пароль
            </p>

            <form className="space-y-8 max-w-md">
                <div className="relative">
                    <MainInput
                        id={'current_password'}
                        label={'Текущий пароль'}
                        value={currentPassword}
                        onChange={setCurrentPassword}
                        className={`mt-3`}
                    />
                </div>
                <div className="relative">
                    <MainInput
                        id={'new_password'}
                        label={'Новый пароль'}
                        value={newPassword}
                        onChange={setNewPassword}
                        className={`mt-3`}
                    />
                </div>
                <div className="relative">
                    <MainInput
                        id={'confirm_password'}
                        label={'Подтвердите пароль'}
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        className={`mt-3`}
                    />
                </div>

                <button type="submit"  className="w-full myButtonColor py-3 text-base font-bold text-black  rounded-lg transition-all">
                    Сохранить изменения
                </button>
            </form>
        </>
    );
}