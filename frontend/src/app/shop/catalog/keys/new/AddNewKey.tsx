"use client"

import styles from "./AddNewKey.module.scss";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";
import {useState} from "react";
import TextAreaInput from "@/components/UI/Inputs/TextAreaInput/TextAreaInput";

export default function AddNewKey() {

    const [gameName, setGameName] = useState<string>('');
    const [gamePrice, setGamePrice] = useState<number>(0);
    const [releaseDate, setReleaseDate] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [developer, setDeveloper] = useState<string>('');
    const [publisher, setPublisher] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    // Для жанров и платформ могут понадобиться другие инпуты (например, multi-select),
    // но для примера пока оставим MainInput
    const [genres, setGenres] = useState<string>('');
    const [platforms, setPlatforms] = useState<string>('');


    return (
        <div className="flex items-center justify-center min-h-screen p-4">

            <div className={`w-full max-w-3xl p-6 space-y-6 rounded-lg ${styles.mainCard}`}>
                <h1 className="text-2xl text-white font-semibold text-center">
                    Добавить новый ключ
                </h1>

                {/*
                    1. `grid` - включаем CSS Grid.
                    2. `grid-cols-1` - по умолчанию (на мобильных) у нас будет одна колонка.
                    3. `md:grid-cols-2` - на экранах среднего размера (md) и больше, сетка переключится на 2 колонки.
                    4. `gap-6` - устанавливает одинаковый отступ между всеми элементами сетки (и по горизонтали, и по вертикали).
                */}
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

                    <MainInput
                        id="genres"
                        label={'Жанры (через запятую)'}
                        value={genres}
                        onChange={setGenres}
                    />

                    <MainInput
                        id="platforms"
                        label={'Платформы (через запятую)'}
                        value={platforms}
                        onChange={setPlatforms}
                    />

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