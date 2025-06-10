"use client"
import styles from "./KeysCatalog.module.scss"


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
            {keysArray.map((game)

            )}
        </>
    );

}