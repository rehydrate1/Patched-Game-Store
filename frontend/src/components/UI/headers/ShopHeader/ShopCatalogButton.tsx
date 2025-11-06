import {memo} from "react";
import {Bars3Icon} from "@heroicons/react/24/outline";

function ShopCatalogButton(){

    return (
        <div className="flex-shrink-0 relative">
            <div
                className={`flex justify-center items-center p-3 md:px-4 md:py-3 rounded-md
                         myButtonColor cursor-pointer`}
            >
                <Bars3Icon className={'h-6 w-6 text-black'} />
                <h2 className={`hidden md:block font-bold text-x pl-2`}>Каталог</h2>
            </div>
        </div>
    )
}

export default memo(ShopCatalogButton);
