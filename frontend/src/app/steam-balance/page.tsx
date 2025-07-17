import SteamBalance from "./SteamBalance"


export const metadata = {
    title: 'Пополнение Steam баланса',
    description: 'Страница пополнения вашего Steam аккаунта',
}


export default function SteamBalancePage() {

    return (
        <>
            <SteamBalance />
        </>
    )
}