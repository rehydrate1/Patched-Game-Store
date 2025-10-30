"use client"

import MainInput from "@/components/Inputs/MainInput";
import TextAreaInput from "@/components/Inputs/TextAreaInput/TextAreaInput";
import MultiSelectDropdown, { SelectOption } from "@/components/Inputs/MultiSelectDropdown/MultiSelectDropdown";
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
import {BackEndResponse} from "@/types";
import LightGreenSubmitBtn from "@/components/buttons/LightGreenBtn/LightGreenSubmitBtn";
import {useInputField} from "@/lib/hooks/useInputField";
import {useSelectField} from "@/lib/hooks/useSelectField";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {FormEvent} from "react";

export default function AddNewKey() {

    const gameName = useInputField('');
    const gamePrice = useInputField('');
    const releaseDate = useInputField('');
    const imageUrl = useInputField('');
    const developer = useInputField('');
    const publisher = useInputField('');
    const description = useInputField('');

    const applications = useSelectField<SelectOption>([]);
    const genres = useSelectField<SelectOption>([]);
    const platforms = useSelectField<SelectOption>([]);

    const {serverError, setServerError, isSubmitting, setIsSubmitting, router} = usePageUtils()

    const validateForm = () => {

        const gameNameError = validateNewKeyName(gameName.inputState.value);
        gameName.setError(gameNameError);

        const gamePriceError = validateNewKeyPrice(gamePrice.inputState.value);
        gamePrice.setError(gamePriceError);

        const releaseDateError = validateNewKeyReleaseData(releaseDate.inputState.value);
        releaseDate.setError(releaseDateError);

        const imageUrlError = validateNewKeyImageUrl(imageUrl.inputState.value);
        imageUrl.setError(imageUrlError);

        const developerError = validateNewKeyDeveloper(developer.inputState.value);
        developer.setError(developerError);

        const publisherError = validateNewKeyPublisher(publisher.inputState.value);
        publisher.setError(publisherError);

        const descriptionError = validateNewKeyDescription(description.inputState.value);
        description.setError(descriptionError);

        const genresError = validateNewKeyGenres(genres.inputState.value);
        genres.setError(genresError);

        const applicationsError = validateNewKeyApplications(applications.inputState.value);
        applications.setError(applicationsError);

        const platformsError = validateNewKeyPlatforms(platforms.inputState.value);
        platforms.setError(platformsError);

        return !(gameNameError || gamePriceError || releaseDateError || imageUrlError ||
            developerError || publisherError || descriptionError || genresError || applicationsError || platformsError);
    };


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setServerError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const payload = {
            gameName: gameName.inputState.value,
            gamePrice: gamePrice.inputState.value,
            releaseDate: releaseDate.inputState.value,
            imageUrl: imageUrl.inputState.value,
            developer : developer.inputState.value,
            publisher: publisher.inputState.value,
            description: description.inputState.value,
            applications: applications.inputState.value.map(a => a.value),
            genres: genres.inputState.value.map(g => g.value),
            platforms: platforms.inputState.value.map(p => p.value),
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
                setIsSubmitting(false);
            }
        }  catch (err) {
            setServerError("Не удалось связаться с сервером. Пожалуйста, проверьте ваше интернет-соединение или попробуйте позже.");
            console.error("Add new key error:", err);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 mt-8">

            <div className={`w-full max-w-3xl p-6 space-y-6 rounded-lg mainColor`}>
                <h1 className="text-2xl text-white font-semibold text-center">
                    Добавить новый ключ
                </h1>

                <ServerError message={serverError} />

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MainInput
                            id={"gameName"}
                            label={'Название игры'}
                            value={gameName.inputState.value}
                            onChange={gameName.setValue}
                            error={gameName.inputState.error || undefined}
                        />

                        <MainInput
                            id={"gamePrice"}
                            label={'Цена ключа'}
                            value={gamePrice.inputState.value}
                            onChange={gamePrice.setValue}
                            error={gamePrice.inputState.error || undefined}

                        />

                        <MainInput
                            id={"releaseDate"}
                            label={'Дата релиза'}
                            value={releaseDate.inputState.value}
                            onChange={releaseDate.setValue}
                            type="date"
                            error={releaseDate.inputState.error || undefined}
                        />

                        <MainInput
                            id={"imageUrl"}
                            label={'Ссылка на фото для карточки'}
                            value={imageUrl.inputState.value}
                            onChange={imageUrl.setValue}
                            error={imageUrl.inputState.error || undefined}
                        />

                        <MainInput
                            id={"developer"}
                            label={'Разработчик'}
                            value={developer.inputState.value}
                            onChange={developer.setValue}
                            error={developer.inputState.error || undefined}
                        />

                        <MainInput
                            id={"publisher"}
                            label={'Издатель'}
                            value={publisher.inputState.value}
                            onChange={publisher.setValue}
                            error={publisher.inputState.error || undefined}
                        />

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Жанры"
                                options={genreOptions}
                                value={genres.inputState.value}
                                onChange={genres.setValue}
                                error={genres.inputState.error || undefined}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Платформы"
                                options={platformOptions}
                                value={platforms.inputState.value}
                                onChange={platforms.setValue}
                                error={platforms.inputState.error || undefined}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Способы активации"
                                options={applicationOptions}
                                value={applications.inputState.value}
                                onChange={applications.setValue}
                                error={applications.inputState.error || undefined}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextAreaInput
                                id={'description'}
                                label={'Описание'}
                                value={description.inputState.value}
                                onChange={description.setValue}
                                error={description.inputState.error || undefined}
                            />
                        </div>
                    </div>

                    <LightGreenSubmitBtn
                        label={!isSubmitting ? 'Добавить новый ключ' : 'Добавление...'}
                        className={'mt-6'}
                        disabled={isSubmitting}
                    />
                </form>
            </div>
        </div>
    )
}