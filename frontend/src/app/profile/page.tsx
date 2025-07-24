import Profile from "./Profile";

export const metadata = {
    title: 'Профиль пользователя',
    description: 'Страница пользовательского профиля магазина Patched',
}


export default function ProfilePage() {

    interface MenuItems{
        id: string;
        label: string;
        icon: 'UserCircleIcon' | 'ShoppingBagIcon' | 'EnvelopeIcon' | 'LockClosedIcon' ;
    }

    const menuItems: MenuItems [] = [
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