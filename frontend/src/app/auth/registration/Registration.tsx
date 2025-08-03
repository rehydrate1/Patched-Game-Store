"use client"

import styles from "./Registration.module.scss";
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";
import Particles from "@/components/UI/Modern/Particles";
import {BackEndResponse} from "@/types/mainTypes";
import HideInput from "@/components/UI/Inputs/HideInput/HideInput";
import {validateConfirmPassword, validateUserEmail, validateUserName, validateUserPassword} from "@/lib/validators";
import ServerError from "@/components/UI/errors/ServerError";


export default function Registration(){

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [serverError, setServerError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const validateUserNameErrors:string | null = validateUserName(userName);
        if (validateUserNameErrors) {
            newErrors.userName = validateUserNameErrors;
        }

        const validateEmailErrors:string | null = validateUserEmail(email);
        if (validateEmailErrors) {
            newErrors.email = validateEmailErrors;
        }

        const validatePasswordErrors:string | null = validateUserPassword(password);
        if (validatePasswordErrors) {
            newErrors.password = validatePasswordErrors;
        }

        const validateConfirmPasswordErrors:string | null = validateConfirmPassword(password, confirmPassword);
        if (validateConfirmPasswordErrors) {
            newErrors.confirmPassword = validateConfirmPasswordErrors;
        }

        return newErrors;
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        setErrors({});
        setServerError(null);

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const payload = {
            userName: userName,
            email: email,
            password: password,
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log("Sending payload:", JSON.stringify(payload));
            const data = (await response.json()) as BackEndResponse;

            if (response.ok) {
                router.replace('/');
            } else {
                setServerError(data.error || "Ошибка регистрации. Проверьте правильность введенных данных.");
            }
        }  catch (err) {
            setServerError("Не удалось связаться с сервером. Пожалуйста, проверьте ваше интернет-соединение или попробуйте позже.");
            console.error("Registration error:", err);
        }
    }


    return (
        <div className="relative min-h-screen overflow-hidden">

            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={['#00FE92', '#ffffff']}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={200}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-md ${styles.main}`}>
                    <h2 className="text-2xl font-semibold text-center text-white">
                        Регистрация
                    </h2>

                    <ServerError message={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <MainInput
                            id={userName}
                            value={userName}
                            onChange={setUserName}
                            label={'Имя пользователя'}
                            error={errors.userName}
                        />

                        <MainInput
                            id={email}
                            type={'email'}
                            value={email}
                            onChange={setEmail}
                            label={'Email'}
                            error={errors.email}
                        />

                        <HideInput
                            label={'Пароль'}
                            id={'password'}
                            value={password}
                            onChange={setPassword}
                            error={errors.password}
                        />

                        <MainInput
                            id={confirmPassword}
                            type={'password'}
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            label={'Повторите пароль'}
                            error={errors.confirmPassword}
                        />

                        <div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-m cursor-pointer font-medium text-black ${styles.submitButton}`}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-sm text-white text-center">
                        Уже есть аккаунт? <Link href="/auth/login" className={`font-medium text-indigo-600 hover:text-indigo-500 ${styles.links}`}>Авторизоваться</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}