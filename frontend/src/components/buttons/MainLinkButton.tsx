import Link from "next/link";

interface MainLinkButtonProps {
    link: string;
    text: string;
    className?: string;
}

export default function MainLinkButton({ link, text, className = '' }: MainLinkButtonProps) {

    return (
        <Link href={link} className={`text-black myButtonColor cursor-pointer w-full font-semibold p-2 rounded-md ${className} `}>
            {text}
        </Link>
    )
}