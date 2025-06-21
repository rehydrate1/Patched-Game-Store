import KeysCatalog from "./KeysCatalog"


export const metadata = {
    title: "Каталог ключей",
    description: 'Страница каталога с ключами'
}


export default function KeysCatalogPage(){

    const arrayOfData = [
        {
         id: 1,
         name: "Grand Theft Auto 5",
         price: "899",
         picture: "https://media.rockstargames.com/rockstargames-newsite/uploads/e4e67668228df3eb050e64232a664f454ab7b030.jpg",
         releaseData: "28.11.2013",
         platforms: ['Windows'],
         applications: ['Steam'],
         genres: ['Экшен', 'Мультиплеер'],
         developer: 'Rockstar Games'
        },
        {
            id: 2,
            name: "Grand Theft Auto 4",
            price: "400",
            picture: "https://media.rockstargames.com/rockstargames-newsite/uploads/e4e67668228df3eb050e64232a664f454ab7b030.jpg",
            releaseData: "28.11.2006",
            platforms: ['macOS'],
            applications: ['EA', 'Steam'],
            genres: ['Экшен', 'Мультиплеер', 'От третьего лица'],
            developer: 'Rockstar Games'
        },
    ];


    return(
        <>
            <KeysCatalog keysArray = {arrayOfData} />
        </>
    )
}