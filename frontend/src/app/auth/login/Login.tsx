"use client"

import {FormEvent, useState} from "react";
import Link from "next/link";
import MainInput from "@/components/Inputs/MainInput";
import HideInput from "@/components/Inputs/HideInput";
import {validateUserEmail, validateUserPassword} from "@/lib/validators";
import ServerError from "@/components/errors/ServerError";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {BackEndResponse} from "@/types";
import LightGreenSubmitBtn from "@/components/buttons/LightGreenBtn/LightGreenSubmitBtn";
import {useInputField} from "@/lib/hooks/useInputField";
import AuthContext from "@/components/UI/UiContext/AuthContext";

export default function Login(){

    const email = useInputField('');
    const password = useInputField('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const {serverError, setServerError, isSubmitting, setIsSubmitting, router} = usePageUtils();

    const validateForm = () => {
        const emailError = validateUserEmail(email.inputState.value);
        email.setError(emailError);

        const passwordError = validateUserPassword(password.inputState.value);
        password.setError(passwordError);

        return !(emailError || passwordError);
    }

    const handleSubmit = async (event: FormEvent):Promise<void> => {
        event.preventDefault();
        setServerError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.inputState.value,
                    password: password.inputState.value,
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
        <AuthContext>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className={`w-full max-w-lg p-8 space-y-6 rounded-lg shadow-md mainColor`}>
                    <div className="">
                        <h2 className="text-2xl pb-3 font-bold text-center text-white">
                            Patched Game Store
                        </h2>

                        <h2 className="text-xl font-semibold text-center text-white/40">
                            Войдите в свой аккаунт
                        </h2>
                    </div>

                    <ServerError message={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <MainInput
                            id={'email'}
                            type={'email'}
                            value={email.inputState.value}
                            onChange={email.setValue}
                            label={'Email'}
                            error={email.inputState.error || undefined}
                        />

                        <HideInput
                            label={'Пароль'}
                            id={'password'}
                            value={password.inputState.value}
                            onChange={password.setValue}
                            error={password.inputState.error || undefined}
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
                        Нет аккаунта? <Link href="/auth/registration" className={`font-medium textLinks`}>Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </AuthContext>
    );
}
