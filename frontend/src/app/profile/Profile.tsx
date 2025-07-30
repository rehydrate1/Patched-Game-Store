"use client";

import { useState } from 'react';
import {
    UserCircleIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ShoppingBagIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import AccountProfile from "@/components/Profile/AccountProfile";
import ChangePassword from '@/components/Profile/ChangePassword';
import PurchaseHistory from '@/components/Profile/PurchaseHistory';
import ChangeEmail from '@/components/Profile/ChangeEmail';
import {ProfileMenuItems} from "@/app/profile/page";

interface ProfileClientProps {
    menuItems: ProfileMenuItems[],
}

export default function ProfileClient({menuItems}:ProfileClientProps) {

    const [activeTab, setActiveTab] = useState('profile');

    const icons = {
        UserCircleIcon: UserCircleIcon,
        EnvelopeIcon: EnvelopeIcon,
        LockClosedIcon: LockClosedIcon,
        ShoppingBagIcon: ShoppingBagIcon,
        ArrowLeftOnRectangleIcon: ArrowLeftOnRectangleIcon,
    }


    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <AccountProfile />;
            case 'password':
                return <ChangePassword />;
            case 'history':
                return <PurchaseHistory />;
            case 'email':
                return <ChangeEmail />;
            default:
                return <AccountProfile />;
        }
    };

    return (
        <div className="text-white min-h-screen w-full p-4 mt-6 sm:p-6 lg:p-8">
            <div className="w-full container mx-auto flex flex-col md:flex-row gap-8">

                {/* === БОКОВОЕ МЕНЮ (SIDEBAR) === */}
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <nav className="space-y-2 bg-[#212227] p-4 rounded-xl border border-white/10">
                        {menuItems.map((item) => {

                            const IconComponent = icons[item.icon]
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 py-3 cursor-pointer px-4 rounded-lg transition-colors text-left ${
                                        activeTab === item.id
                                            ? 'bg-[#00FE92] text-black font-bold'
                                            : 'text-gray-300 hover:bg-gray-700/50'
                                    }`}
                                >
                                    <IconComponent className="h-6 w-6"/>
                                    <span className="text-md">{item.label}</span>
                                </button>
                            )
                        })}
                        <div className="border-t border-white/10 my-2"></div>
                        <button
                            className="w-full flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg transition-colors text-left text-gray-300 hover:bg-red-800/50"
                        >
                            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                            <span className="text-md">Выйти</span>
                        </button>
                    </nav>
                </aside>

                {/* === ОСНОВНОЙ КОНТЕНТ === */}
                <main className="w-full md:w-3/4 lg:w-4/5 bg-[#212227] p-6 sm:p-8 rounded-xl border border-white/10">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}