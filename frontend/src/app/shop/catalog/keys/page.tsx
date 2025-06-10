import KeysCatalog from "./KeysCatalog"


export const metadata = {
    title: "Каталог ключей",
    description: 'Страница каталога с ключами'
}


export default function KeysCatalogPage(){

    const arrayOfData = [
        {id: 1,
         name: "Grand Theft Auto 5",
         price: "",
         picture: "",
         releaseData: "",
         platforms: ['windows'],
         applications: ['steam'],
         genres: ['Экшен', 'Мультиплеер'],
         developer: 'Rockstar Games'
        },
    ];


    return(
        <>
            <KeysCatalog keysArray = {arrayOfData} />
        </>
    )
}