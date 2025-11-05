import {
    UserCircleIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import {ElementType} from "react";

export interface ProfileMenuItemsStructure{
    id: string;
    label: string;
    icon: ElementType ;
}

export const profileMenuItems: ProfileMenuItemsStructure [] = [
    { id: 'profile', label: 'Профиль', icon: UserCircleIcon },
    { id: 'history', label: 'История покупок', icon: ShoppingBagIcon },
    { id: 'email', label: 'Сменить почту', icon: EnvelopeIcon },
    { id: 'password', label: 'Сменить пароль', icon: LockClosedIcon },
];