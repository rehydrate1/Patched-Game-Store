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

                <div className="">
                    фильтры
                </div>

                <div className="">
                    {keysArray.map((game) => (
                        <div key={game.id} className={`flex items-center ${styles.mainCard}`}>
                          <Image src = {game.picture} width = {220} height = {220} alt = {game.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}