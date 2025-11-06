import Link from "next/link";
import {HeaderItemProps} from "@/types";
import {memo} from "react";


function PCHeaderItem({text, link, className = ''}: HeaderItemProps) {

    return (
        <li>
            <Link href={link}>
                <div className={`flex text-center justify-center border mainHeaderNavItemsStyles items-center 
                    p-1 rounded-lg ${className} `}>
                    <h3 className={`p-1 px-3 `}>{text}</h3>
                </div>
            </Link>
        </li>
    )
}

export default memo(PCHeaderItem);