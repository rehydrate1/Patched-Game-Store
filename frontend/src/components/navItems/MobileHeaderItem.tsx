import Link from "next/link";
import {HeaderItemProps} from "@/types";
import {memo} from "react";

function MobileHeaderItem({text, link, functionName, className = ''}: HeaderItemProps) {

    return (
        <li className="w-full">
            <Link href={link} onClick={functionName}>
                <div className={`w-full text-center justify-center border mainHeaderNavItemsStyles items-center p-3 
                    rounded-md ${className}  `}>
                    <h3 className={`text-lg`}>{text}</h3>
                </div>
            </Link>
        </li>
    )
}

export default memo(MobileHeaderItem);