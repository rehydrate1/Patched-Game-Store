"use client";

import { useState } from 'react';
import { UserCircleIcon, LockClosedIcon, ShoppingBagIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import AccountProfile from "@/components/Profile/AccountProfile";
import ChangePassword from '@/components/Profile/ChangePassword';
import PurchaseHistory from '@/components/Profile/PurchaseHistory';
import ChangeEmail from '@/components/Profile/ChangeEmail';
import {HeartIcon} from "@heroicons/react/16/solid";

export default function ProfileClient() {
    const [activeTab, setActiveTab] = useState('profile');

    const menuItems = [
        { id: 'profile', label: 'Профиль', icon: UserCircleIcon },
        { id: 'history', label: 'История покупок', icon: ShoppingBagIcon },
        { id: 'email', label: 'Сменить почту', icon: LockClosedIcon },
        { id: 'password', label: 'Сменить пароль', icon: LockClosedIcon },

    ];

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
            <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8">

                {/* === БОКОВОЕ МЕНЮ (SIDEBAR) === */}
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <nav className="space-y-2 bg-[#212227] p-4 rounded-xl border border-white/10">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-colors text-left ${
                                    activeTab === item.id
                                        ? 'bg-[#00FE92] text-black font-bold'
                                        : 'text-gray-300 hover:bg-gray-700/50'
                                }`}
                            >
                                <item.icon className="h-6 w-6" />
                                <span className="text-md">{item.label}</span>
                            </button>
                        ))}
                        <div className="border-t border-white/10 my-2"></div>
                        <button
                            className="w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-colors text-left text-gray-300 hover:bg-red-800/50"
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