import {memo, useMemo, useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

function ShopSearchInput(){

    const [search, setSearch] = useState<string>('');
    const SearchIcon = useMemo(() => (
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    ), [])

    return (
        <div className="flex-grow">
            <form action="#" method="GET" className="w-full">
                <label htmlFor="search" className="sr-only">Поиск</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {SearchIcon}
                    </div>
                    <input
                        id="search"
                        name="search"
                        className={`block w-full pr-3 pl-10 py-2 border rounded-md leading-8 placeholder-white focus:outline-none sm:text-sm shopHeaderSearchInput`}
                        placeholder="Поиск..."
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}

export default memo(ShopSearchInput);