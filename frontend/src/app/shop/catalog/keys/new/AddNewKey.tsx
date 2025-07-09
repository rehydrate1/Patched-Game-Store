"use client"

import styles from "./AddNewKey.module.scss";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";
import {useState} from "react";
import TextAreaInput from "@/components/UI/Inputs/TextAreaInput/TextAreaInput";
import MultiSelectDropdown, { SelectOption } from "@/components/UI/Inputs/MultiSelectDropdown/MultiSelectDropdown";


export default function AddNewKey() {

    const [gameName, setGameName] = useState<string>('');
    const [gamePrice, setGamePrice] = useState<number>(0);
    const [releaseDate, setReleaseDate] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [developer, setDeveloper] = useState<string>('');
    const [publisher, setPublisher] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [applications, setApplications] = useState<SelectOption[]>([]);
    const [genres, setGenres] = useState<SelectOption[]>([]);
    const [platforms, setPlatforms] = useState<SelectOption[]>([]);

    const platformOptions: SelectOption[] = [
        { value: 'Windows', label: 'Windows' },
        { value: 'macOS', label: 'macOS' },
        { value: 'Linux', label: 'Linux' },
    ];

    const applicationOptions: SelectOption[] = [
        { value: 'Steam', label: 'Steam' },
        { value: 'Epic Games', label: 'Epic Games' },
        { value: 'GOG', label: 'GOG' },
        { value: 'EA', label: 'EA' },
        { value: 'Ubisoft Connect', label: 'Ubisoft Connect' },
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

    return (
        <div className="flex items-center justify-center min-h-screen p-4 mt-8">

            <div className={`w-full max-w-3xl p-6 space-y-6 rounded-lg ${styles.mainCard}`}>
                <h1 className="text-2xl text-white font-semibold text-center">
                    Добавить новый ключ
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MainInput
                        id="gameName"
                        label={'Название игры'}
                        value={gameName}
                        onChange={setGameName}
                    />

                    <MainInput
                        id="gamePrice"
                        label={'Цена ключа'}
                        value={gamePrice}
                        onChange={setGamePrice}
                    />

                    <MainInput
                        id="releaseDate"
                        label={'Дата релиза'}
                        value={releaseDate}
                        onChange={setReleaseDate}
                        type="date"
                    />

                    <MainInput
                        id="imageUrl"
                        label={'Ссылка на фото для карточки'}
                        value={imageUrl}
                        onChange={setImageUrl}
                    />

                    <MainInput
                        id="developer"
                        label={'Разработчик'}
                        value={developer}
                        onChange={setDeveloper}
                    />

                    <MainInput
                        id="publisher"
                        label={'Издатель'}
                        value={publisher}
                        onChange={setPublisher}
                    />

                    <div className="md:col-span-2">
                        <MultiSelectDropdown
                            label="Жанры"
                            options={genreOptions}
                            value={genres}
                            onChange={setGenres}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <MultiSelectDropdown
                            label="Платформы"
                            options={platformOptions}
                            value={platforms}
                            onChange={setPlatforms}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <MultiSelectDropdown
                            label="Способы активации"
                            options={applicationOptions}
                            value={applications}
                            onChange={setApplications}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <TextAreaInput id={description} label={'Описание'} value={description} onChange={setDescription} />
                    </div>
                </div>

                <div className="flex justify-сenter">
                    <button type="submit" className={`text-black cursor-pointer w-full font-semibold p-2 rounded-md ${styles.addButton}`}>
                        Добавить новый ключ
                    </button>
                </div>
            </div>
        </div>
    )
}