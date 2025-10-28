"use client"

import styles from "./AddNewKey.module.scss";
import MainInput from "@/components/Inputs/MainInput";
import React, {useState} from "react";
import TextAreaInput from "@/components/Inputs/TextAreaInput/TextAreaInput";
import MultiSelectDropdown, { SelectOption } from "@/components/Inputs/MultiSelectDropdown/MultiSelectDropdown";
import {useRouter} from "next/navigation";
import {BackEndResponse} from "@/types/mainTypes";
import {
    validateNewKeyApplications,
    validateNewKeyDescription,
    validateNewKeyDeveloper, validateNewKeyGenres,
    validateNewKeyImageUrl,
    validateNewKeyName, validateNewKeyPlatforms,
    validateNewKeyPrice, validateNewKeyPublisher,
    validateNewKeyReleaseData
} from "@/lib/validators";
import ServerError from "@/components/errors/ServerError";
import {applicationOptions, genreOptions, platformOptions} from "@/lib/data/indexData";

export default function AddNewKey() {

    const [gameName, setGameName] = useState<string>('');
    const [gamePrice, setGamePrice] = useState<string>('');
    const [releaseDate, setReleaseDate] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [developer, setDeveloper] = useState<string>('');
    const [publisher, setPublisher] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [applications, setApplications] = useState<SelectOption[]>([]);
    const [genres, setGenres] = useState<SelectOption[]>([]);
    const [platforms, setPlatforms] = useState<SelectOption[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const gameNameError = validateNewKeyName(gameName);
        if (gameNameError) {
            newErrors.gameName = gameNameError;
        }

        const gamePriceError = validateNewKeyPrice(gamePrice);
        if (gamePriceError) {
            newErrors.gamePrice = gamePriceError;
        }

        const releaseDateError = validateNewKeyReleaseData(releaseDate);
        if (releaseDateError) {
            newErrors.releaseDate = releaseDateError;
        }

        const imageUrlError = validateNewKeyImageUrl(imageUrl);
        if (imageUrlError) {
            newErrors.imageUrl = imageUrlError;
        }

        const developerError = validateNewKeyDeveloper(developer);
        if (developerError) {
            newErrors.developer = developerError;
        }

        const publisherError = validateNewKeyPublisher(publisher);
        if (publisherError) {
            newErrors.publisher = publisherError;
        }

        const descriptionError = validateNewKeyDescription(description);
        if (descriptionError) {
            newErrors.description = descriptionError;
        }

        const genresError = validateNewKeyGenres(genres);
        if (genresError) {
            newErrors.genres = genresError;
        }

        const applicationsError = validateNewKeyApplications(applications);
        if (applicationsError) {
            newErrors.applications = applicationsError;
        }

        const platformsError = validateNewKeyPlatforms(platforms);
        if (platformsError) {
            newErrors.platforms = platformsError;
        }

        return newErrors;
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});
        setServerError(null);

        const formErrors = validateForm();

        // Если есть хотя бы одна ошибка, обновляем состояние и прерываем выполнение
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const payload = {
            gameName,
            gamePrice,
            releaseDate,
            imageUrl,
            developer,
            publisher,
            description,
            applications: applications.map(a => a.value), // Отправляем только значения
            genres: genres.map(g => g.value),
            platforms: platforms.map(p => p.value),
        };


        try {
            const response = await fetch("http://localhost:8082/api/create/key", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = (await response.json()) as BackEndResponse;

            if (response.ok) {
                router.push('/catalog/keys');
            } else {
                setServerError(data.error || "Ошибка добавления. Проверьте правильность введенных данных.");
            }
        }  catch (err) {
            setServerError("Не удалось связаться с сервером. Пожалуйста, проверьте ваше интернет-соединение или попробуйте позже.");
            console.error("Add new key error:", err);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 mt-8">

            <div className={`w-full max-w-3xl p-6 space-y-6 rounded-lg ${styles.mainCard}`}>
                <h1 className="text-2xl text-white font-semibold text-center">
                    Добавить новый ключ
                </h1>

                <ServerError message={serverError} />

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MainInput
                            id="gameName"
                            label={'Название игры'}
                            value={gameName}
                            onChange={setGameName}
                            error={errors.gameName}
                        />

                        <MainInput
                            id="gamePrice"
                            label={'Цена ключа'}
                            value={gamePrice}
                            onChange={setGamePrice}
                            error={errors.gamePrice}

                        />

                        <MainInput
                            id="releaseDate"
                            label={'Дата релиза'}
                            value={releaseDate}
                            onChange={setReleaseDate}
                            type="date"
                            error={errors.releaseDate}
                        />

                        <MainInput
                            id="imageUrl"
                            label={'Ссылка на фото для карточки'}
                            value={imageUrl}
                            onChange={setImageUrl}
                            error={errors.imageUrl}
                        />

                        <MainInput
                            id="developer"
                            label={'Разработчик'}
                            value={developer}
                            onChange={setDeveloper}
                            error={errors.developer}
                        />

                        <MainInput
                            id="publisher"
                            label={'Издатель'}
                            value={publisher}
                            onChange={setPublisher}
                            error={errors.publisher}
                        />

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Жанры"
                                options={genreOptions}
                                value={genres}
                                onChange={setGenres}
                                error={errors.genres}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Платформы"
                                options={platformOptions}
                                value={platforms}
                                onChange={setPlatforms}
                                error={errors.platforms}

                            />
                        </div>

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Способы активации"
                                options={applicationOptions}
                                value={applications}
                                onChange={setApplications}
                                error={errors.applications}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextAreaInput
                                id={description}
                                label={'Описание'}
                                value={description}
                                onChange={setDescription}
                                error={errors.description}
                            />
                        </div>
                    </div>

                    <div className="flex justify-сenter mt-6">
                        <button type="submit" className={`text-black cursor-pointer w-full font-semibold p-2 rounded-md ${styles.addButton}`}>
                            Добавить новый ключ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}