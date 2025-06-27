"use client"

import styles from "./AddNewKey.module.scss";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";
import {useState} from "react";
import TextAreaInput from "@/components/UI/Inputs/TextAreaInput/TextAreaInput";
import MultiSelectDropdown, { SelectOption } from "@/components/UI/Inputs/MultiSelectDropdown/MultiSelectDropdown";
import {useRouter} from "next/navigation";

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
    const router = useRouter();

    interface BackEndResponse {
        error?: string;
    }

    const platformOptions: SelectOption[] = [
        { value: 'Windows', label: 'Windows' },
        { value: 'macOS', label: 'macOS' },
        { value: 'Linux', label: 'Linux' },
    ];

    const applicationOptions: SelectOption[] = [
        { value: 'Steam', label: 'Steam' },
        { value: 'Epic Games', label: 'Epic Games' },
        { value: 'Rockstar Launcher', label: 'Rockstar Launcher' },
        { value: 'GOG', label: 'GOG' },
        { value: 'Bethesda.net', label: 'Bethesda.net' },
        { value: 'Ubisoft', label: 'Ubisoft' },
    ];

    const genreOptions: SelectOption[] = [
        { value: 'action', label: 'Экшен' },
        { value: 'rpg', label: 'RPG' },
        { value: 'strategy', label: 'Стратегия' },
        { value: 'shooter', label: 'Шутер' },
        { value: 'adventure', label: 'Приключение' },
        { value: 'simulator', label: 'Симулятор' },
        { value: 'horror', label: 'Хоррор' },
        { value: 'indie', label: 'Инди' },
    ];

    const validateGameName = (gameName: string): string | null => {
        if (!gameName.trim()) {
            return "Пожалуйста, введите название игры.";
        }

        if (gameName.length < 3 || gameName.length > 35) {
            return `Название игры должно содержать от 3 до 35 символов (сейчас ${gameName.length}).`;
        }

        const gameNameCheckRegex = /^[A-Za-z0-9:,\s]+$/;
        if (!gameNameCheckRegex.test(gameName)) {
            return "Название игры может содержать только латинские буквы, цифры и некоторые спец.символы.";
        }

        return null;
    };

    const validateGamePrice = (gamePrice: string): string | null => {
        if (!gamePrice.trim()) {
            return "Пожалуйста, введите цену игры.";
        }

        const gamePriceCheckRegex = /^[0-9]+$/;
        if (!gamePriceCheckRegex.test(gamePrice)) {
            return "Цена может содержать только цифры.";
        }

        return null;
    };

    const validateReleaseData = (releaseData: string): string | null => {
        if (!releaseData.trim()) {
            return "Пожалуйста, введите дату релиза игры.";
        }


        return null;
    };

    const validateImageUrl = (imageUrl: string): string | null => {
        if (!imageUrl.trim()) {
            return "Пожалуйста, введите название игры.";
        }

        const imageUrlCheckRegex = /^[A-Za-z0-9:,/;]+$/;
        if (!imageUrlCheckRegex.test(imageUrl)) {
            return "Cсылка может содержать только латинские буквы, цифры и некоторые спец.символы.";
        }

        return null;
    };

    const validateDeveloper = (developer: string): string | null => {
        if (!developer.trim()) {
            return "Пожалуйста, укажите имя разработчика игры.";
        }

        if (developer.length < 3 || developer.length > 20) {
            return `Имя разработчика должно содержать от 3 до 20 символов (сейчас ${developer.length}).`;
        }

        const developerCheckRegex = /^[A-Za-z0-9:,\s]+$/;
        if (!developerCheckRegex.test(developer)) {
            return "Имя разработчика может содержать только латинские буквы, цифры и некоторые спец.символы.";
        }

        return null;
    };

    const validatePublisher = (publisher: string): string | null => {
        if (!publisher.trim()) {
            return "Пожалуйста, укажите имя издателя игры.";
        }

        if (publisher.length < 3 || publisher.length > 20) {
            return `Имя издателя должно содержать от 3 до 20 символов (сейчас ${publisher.length}).`;
        }

        const publisherCheckRegex = /^[A-Za-z0-9:,\s]+$/;
        if (!publisherCheckRegex.test(publisher)) {
            return "Имя издателя может содержать только латинские буквы, цифры и некоторые спец.символы.";
        }

        return null;
    };

    const validateDescription = (description: string): string | null => {
        if (!description.trim()) {
            return "Пожалуйста, укажите описание игры.";
        }

        if (description.length < 10 || description.length > 600) {
            return `Описание должно содержать от 10 до 600 символов (сейчас ${description.length}).`;
        }

        const descriptionCheckRegex = /^[A-Za-zА-Яа-я0-9:,/.;\s\-()?!"']+$/;
        if (!descriptionCheckRegex.test(description)) {
            return "Описание может содержать только латиницу, кириллицу, цифры и некоторые спец.символы.";
        }

        return null;
    };

    const validateGenres = (genres: any): string | null => {
        if (genres.length < 3 || genres.length > 6) {
            return `Количество выбранных жанров должно быть от 3 до 6.`;
        }

        return null;
    };

    const validateApplications = (applications: any): string | null => {
        if (applications.length === 0) {
            return `Выберете хотя бы один способ активации.`;
        }

        return null;
    };

    const validatePlatforms = (platforms: any): string | null => {
        if (platforms.length === 0) {
            return `Выберете хотя бы одну платформу.`;
        }

        return null;
    };






    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const gameNameError = validateGameName(gameName);
        if (gameNameError) {
            newErrors.gameName = gameNameError;
        }

        const gamePriceError = validateGamePrice(gamePrice);
        if (gamePriceError) {
            newErrors.gamePrice = gamePriceError;
        }

        const releaseDateError = validateReleaseData(releaseDate);
        if (releaseDateError) {
            newErrors.releaseDate = releaseDateError;
        }

        const imageUrlError = validateImageUrl(imageUrl);
        if (imageUrlError) {
            newErrors.imageUrl = imageUrlError;
        }

        const developerError = validateDeveloper(developer);
        if (developerError) {
            newErrors.developer = developerError;
        }

        const publisherError = validatePublisher(publisher);
        if (publisherError) {
            newErrors.publisher = publisherError;
        }

        const descriptionError = validateDescription(description);
        if (descriptionError) {
            newErrors.description = descriptionError;
        }

        const genresError = validateGenres(genres);
        if (genresError) {
            newErrors.genres = genresError;
        }

        const platformsError = validatePlatforms(platforms);
        if (platformsError) {
            newErrors.platforms = platformsError;
        }

        const applicationsError = validateApplications(applications);
        if (applicationsError) {
            newErrors.applications = applicationsError;
        }

        return newErrors;
    };



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});

        // Проводим валидацию
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
                setErrors({ form: data.error || "Ошибка добавления." });
            }
        } catch (err) {
            setErrors({ form: "Ошибка соединения с сервером" });
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 mt-8">

            <div className={`w-full max-w-3xl p-6 space-y-6 rounded-lg ${styles.mainCard}`}>
                <h1 className="text-2xl text-white font-semibold text-center">
                    Добавить новый ключ
                </h1>

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

                    <div className="flex justify-сenter mt-4">
                        <button type="submit" className={`text-black cursor-pointer w-full font-semibold p-2 rounded-md ${styles.addButton}`}>
                            Добавить новый ключ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}