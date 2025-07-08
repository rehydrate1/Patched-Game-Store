"use client"


import { usePathname } from 'next/navigation';
import MainHeader from "@/components/UI/Headers/MainHeader/MainHeader";
import ShopHeader from "@/components/UI/Headers/ShopHeader/ShopHeader";
import React from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }): React.ReactElement {

    const pathname: string = usePathname();``
    const isAuthPage: boolean = pathname.startsWith('/auth');
    const isShopPage: boolean = pathname.startsWith('/shop');

    return (
        <>
            <div className="">
                {!isAuthPage && (
                    <MainHeader />
                )}
                {!isAuthPage && isShopPage && (
                    <ShopHeader />
                )}
                <main>
                    {children}
                </main>
            </div>

        </>
    )
}