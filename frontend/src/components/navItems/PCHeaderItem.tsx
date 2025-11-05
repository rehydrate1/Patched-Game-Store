import Link from "next/link";

interface PCCHeaderItemProps {
    text: string;
    link: string;
    className?: string;
}

export default function PCHeaderItem({text, link, className = ''}: PCCHeaderItemProps) {

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