"use client"
import styles from "./KeysCatalog.module.scss"
import Image from "next/image";

interface KeysCatalogProps {
    keysArray?: {
        id: number;
        name: string;
        price: string;
        picture: string;
        releaseData: string;
        platforms: string[];
        applications: string[];
        genres: string[];
        developer: string
    }[]
}

export default function KeysCatalog({keysArray}: KeysCatalogProps) {


    return (
        <>
            <div className="flex container mx-auto items-center my-10">

                <div className="text-white">
                    фильтры
                </div>

                <div className="">
                    {keysArray.map((game) => (
                        <div key={game.id} className={`flex items-center py-4 px-6 rounded-lg ${styles.mainCard}`}>
                          <Image className={`rounded-md`} src = {game.picture} width = {230} height = {230} alt = {game.name} />
                            <div className="flex items-center space-x-45 pl-6">
                                <div className="">
                                    <h1 className={`text-white`}>{game.name}</h1>
                                    <p className={`text-white`}>Дата выхода: {game.releaseData}</p>
                                </div>

                                <div className="">
                                    <h1 className={`text-white font-bold text-3xl`}>{game.price} р</h1>
                                    <button className={`text-black font-semibold p-2 mt-5 rounded-md ${styles.addButton}`}>Добавить в корзину</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}