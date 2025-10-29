"use client"

import {FormEvent} from "react";
import Link from "next/link";
import MainInput from "@/components/Inputs/MainInput";
import HideInput from "@/components/Inputs/HideInput";
import {validateConfirmPassword, validateUserEmail, validateUserName, validateUserPassword} from "@/lib/validators";
import ServerError from "@/components/errors/ServerError";
import {BackEndResponse} from "@/types";
import LightGreenSubmitBtn from "@/components/buttons/LightGreenSubmitBtn/LightGreenSubmitBtn";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {useInputField} from "@/lib/hooks/useInputField";
import Aurora from "@/components/UI/modern/Aurora";
import { XMarkIcon } from '@heroicons/react/24/outline';


export default function Registration(){

    const userName = useInputField('');
    const email = useInputField('');
    const password = useInputField('');
    const confirmPassword = useInputField('');
    const {serverError, setServerError, isSubmitting, setIsSubmitting, router} = usePageUtils()

    const validateForm = (): boolean => {
        const userNameError = validateUserName(userName.inputState.value);
        userName.setError(userNameError);

        const emailError = validateUserEmail(email.inputState.value);
        email.setError(emailError);

        const passwordError = validateUserPassword(password.inputState.value);
        password.setError(passwordError);

        const confirmPasswordError = validateConfirmPassword(password.inputState.value, confirmPassword.inputState.value);
        confirmPassword.setError(confirmPasswordError);

        return !(userNameError || emailError || passwordError || confirmPasswordError);
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        setServerError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("http://localhost:8080/api/user/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: userName.inputState.value,
                    email: email.inputState.value,
                    password: password.inputState.value,
                }),
            });

            const data = (await response.json()) as BackEndResponse;

            if (response.ok) {
                router.replace('/');
            } else {
                setServerError(data.error || "Ошибка регистрации. Проверьте правильность введенных данных.");
                setIsSubmitting(false);
            }
        }  catch (err) {
            setServerError("Не удалось связаться с сервером. Пожалуйста, проверьте ваше интернет-соединение или попробуйте позже.");
            console.error("Registration error:", err);
            setIsSubmitting(false);
        }
    }


    return (
        <div className="relative min-h-screen overflow-hidden">

            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#099f5f", "#00FE92", "#00d17a"]}
                    amplitude={0.6}
                    speed={0.4}
                    blend={0.45}
                />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className={`w-full max-w-lg p-8 space-y-6 rounded-lg shadow-md mainColor`}>
                    <div className="">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl pb-2 font-bold text-center text-white">
                                Patched Game Store
                            </h2>
                            <Link href={'/'} className={`p-2 rounded-full border border-[#212227] 
                            hover:border-white/40 duration-300 easy-in-out`}>
                                <XMarkIcon className={`h-7 w-7 text-white`} />
                            </Link>
                        </div>

                        <h2 className="text-xl font-semibold text-left text-white/40">
                            Зарегистрировать новый аккаунт
                        </h2>
                    </div>

                    <ServerError message={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <MainInput
                            id={'userName'}
                            value={userName.inputState.value}
                            onChange={userName.setValue}
                            label={'Имя пользователя'}
                            error={userName.inputState.error || undefined}
                        />

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

                        <MainInput
                            id={'confirmPassword'}
                            type={'password'}
                            value={confirmPassword.inputState.value}
                            onChange={confirmPassword.setValue}
                            label={'Повторите пароль'}
                            error={confirmPassword.inputState.error || undefined}
                        />

                        <LightGreenSubmitBtn
                            label={!isSubmitting ? 'Зарегистрироваться' : 'Регистрация...'}
                            disabled={isSubmitting}
                        />

                    </form>

                    <div className="mt-4 text-sm text-white text-center">
                        Уже есть аккаунт? <Link href="/auth/login" className={`font-medium text-indigo-600 hover:text-indigo-500 textLinks`}>Авторизоваться</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}