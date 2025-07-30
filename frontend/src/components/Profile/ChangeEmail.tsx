"use client"



import {useState} from "react";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";

export default function ChangePassword() {

    const [currentEmail, setCurrentEmail] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    return (

        <>
            <h1 className="text-3xl font-bold text-white mb-2">
                Смена почты
            </h1>
            <p className="text-gray-400 mb-8">
                Рекомендуем использовать проверенных почтовых операторов
            </p>

            <form className="space-y-8 max-w-md">
                <div className="relative">
                    <MainInput
                        id={'current_email'}
                        label={'Текущий Email'}
                        value={currentEmail}
                        onChange={setCurrentEmail}
                        className={`mt-3`}
                    />
                </div>
                <div className="relative">
                    <MainInput
                        id={'new_email'}
                        label={'Новый Email'}
                        value={newEmail}
                        onChange={setNewEmail}
                        className={`mt-3`}
                    />
                </div>
                <div className="relative">
                    <MainInput
                        id={'password'}
                        label={'Пароль от аккаунта'}
                        value={password}
                        onChange={setPassword}
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