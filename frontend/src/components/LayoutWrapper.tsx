"use client"

import { usePathname } from 'next/navigation';
import MainHeader from "@/components/UI/Headers/MainHeader/MainHeader";
import ShopHeader from "@/components/UI/Headers/ShopHeader/ShopHeader";
import React from "react";
import MainFooter from "@/components/UI/Footers/MainFooter/MainFooter";

export default function LayoutWrapper({ children }: { children: React.ReactNode }): React.ReactElement {
    const pathname: string = usePathname();
    const isAuthPage: boolean = pathname.startsWith('/auth');

    return (
        <>
            {/* Добавляем классы для стилизации */}
            <div className="layout-wrapper">
                {!isAuthPage && (
                    <MainHeader />
                )}
                {!isAuthPage && (
                    <ShopHeader />
                )}
                {/* Добавляем класс для основного контента */}
                <main className="main-content">
                    {children}
                </main>
                {!isAuthPage && (
                    <MainFooter />
                )}
            </div>
        </>
    )
}