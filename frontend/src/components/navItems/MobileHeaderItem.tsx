import Link from "next/link";
import {MouseEventHandler} from "react";

interface MobileHeaderItemProps {
    text: string;
    link: string;
    functionName: MouseEventHandler;
    className?: string;
}

export default function MobileHeaderItem({text, link, functionName, className = ''}: MobileHeaderItemProps) {


    return (
        <li className="w-full">
            <Link href={link} onClick={functionName}>
                <div className={`w-full text-center justify-center items-center p-3 
                    rounded-md ${className} navItem `}>
                    <h3 className={`text-lg`}>{text}</h3>
                </div>
            </Link>
        </li>
    )
}