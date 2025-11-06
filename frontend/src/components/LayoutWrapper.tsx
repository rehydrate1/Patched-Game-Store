"use client"

import { usePathname } from 'next/navigation';
import MainHeader from "@/components/UI/headers/MainHeader/MainHeader";
import ShopHeader from "@/components/UI/headers/ShopHeader/ShopHeader";
import {ReactElement, ReactNode} from "react";
import MainFooter from "@/components/UI/footers/MainFooter";

export default function LayoutWrapper({ children }: { children: ReactNode }): ReactElement {

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