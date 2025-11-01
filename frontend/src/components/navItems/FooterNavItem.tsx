import Link from "next/link";

interface FooterNavItemProps {
    text: string,
    link: string,
    className?: string,
}

export default function FooterNavItem({text, link, className = ''}: FooterNavItemProps) {

    return (
        <li>
            <Link href={link} className={`navItem transition-colors duration-300 hover:text-white ${className}`}>
                {text}
            </Link>
        </li>
    )
}