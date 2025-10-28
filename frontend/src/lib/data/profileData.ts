export interface ProfileMenuItemsStructure{
    id: string;
    label: string;
    icon: 'UserCircleIcon' | 'ShoppingBagIcon' | 'EnvelopeIcon' | 'LockClosedIcon' ;
}

export const profileMenuItems: ProfileMenuItemsStructure [] = [
    { id: 'profile', label: 'Профиль', icon: 'UserCircleIcon' },
    { id: 'history', label: 'История покупок', icon: 'ShoppingBagIcon' },
    { id: 'email', label: 'Сменить почту', icon: 'EnvelopeIcon' },
    { id: 'password', label: 'Сменить пароль', icon: 'LockClosedIcon' },
];