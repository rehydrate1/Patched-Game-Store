"use client"

import {FormEvent, useState} from "react";
import Link from "next/link";
import MainInput from "@/components/Inputs/MainInput";
import Particles from "@/components/UI/modern/Particles";
import HideInput from "@/components/Inputs/HideInput";
import {validateUserEmail, validateUserPassword} from "@/lib/validators";
import ServerError from "@/components/errors/ServerError";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {BackEndResponse} from "@/types";
import LightGreenSubmitBtn from "@/components/buttons/LightGreenSubmitBtn/LightGreenSubmitBtn";

export default function Login(){

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const {serverError, setServerError, isSubmitting, setIsSubmitting, router} = usePageUtils()

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const validateEmailErrors:string | null = validateUserEmail(email);
        if (validateEmailErrors) {
            newErrors.email = validateEmailErrors;
        }

        const validatePasswordErrors:string | null = validateUserPassword(password);
        if (validatePasswordErrors) {
            newErrors.password = validatePasswordErrors;
        }

        return newErrors;
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        setErrors({});
        setServerError(null);

        setIsSubmitting(true);

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    rememberMe: rememberMe,
                }),
            });

            const data = (await response.json()) as BackEndResponse;

            if (response.ok) {
                router.replace('/');
            } else {
                setServerError(data.error || "Ошибка авторизации. Проверьте правильность введенных данных.");
                setIsSubmitting(false);
            }
        }  catch (err) {
            setServerError("Не удалось связаться с сервером. Пожалуйста, проверьте ваше интернет-соединение или попробуйте позже.");
            console.error("Login error:", err);
            setIsSubmitting(false);
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
                <div className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-md mainColor`}>
                    <h2 className="text-2xl font-semibold text-center text-white">
                        Авторизация
                    </h2>

                    <ServerError message={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit}>

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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="w-4 h-4 cursor-pointer border-gray-300 rounded"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="remember-me" className="block ml-2 cursor-pointer text-sm text-white">
                                    Запомнить меня
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/auth/forgot-password" className={`font-medium text-white textLinks`}>
                                    Забыли пароль?
                                </Link>
                            </div>
                        </div>

                        <LightGreenSubmitBtn
                            label={!isSubmitting ? 'Войти' : 'Вход...'}
                            disabled={isSubmitting}
                        />

                    </form>

                    <div className="mt-4 text-sm text-white text-center">
                        Нет аккаунта? <Link href="/auth/registration" className={`font-medium text-indigo-600 hover:text-indigo-500 textLinks`}>Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
