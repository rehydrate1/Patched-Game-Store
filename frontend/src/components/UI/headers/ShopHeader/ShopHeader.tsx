"use client"

import {memo} from "react";
import CartIconElement from "@/components/UI/headers/ShopHeader/CartIconElement";
import ShopCatalogButton from "@/components/UI/headers/ShopHeader/ShopCatalogButton";
import ShopSearchInput from "@/components/UI/headers/ShopHeader/ShopSearchInput";

function ShopHeader() {

    return (
        <div className={`mainColor pt-3 pb-6`}>
            <div className="container mx-auto  flex items-center justify-between px-2 gap-2 md:px-0 md:gap-4">

                <ShopCatalogButton />

                <ShopSearchInput />

                <CartIconElement />

            </div>
        </div>
    );
}

export default memo(ShopHeader);