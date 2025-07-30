import Profile from "./Profile";

export const metadata = {
    title: 'Профиль пользователя | Patched',
    description: 'Страница пользовательского профиля магазина Patched',
}

export interface ProfileMenuItems{
    id: string;
    label: string;
    icon: 'UserCircleIcon' | 'ShoppingBagIcon' | 'EnvelopeIcon' | 'LockClosedIcon' ;
}


export default function ProfilePage() {


    const menuItems: ProfileMenuItems [] = [
        { id: 'profile', label: 'Профиль', icon: 'UserCircleIcon' },
        { id: 'history', label: 'История покупок', icon: 'ShoppingBagIcon' },
        { id: 'email', label: 'Сменить почту', icon: 'EnvelopeIcon' },
        { id: 'password', label: 'Сменить пароль', icon: 'LockClosedIcon' },
    ];

    return (
        <>
            <Profile menuItems = {menuItems}  />
        </>
    )
}