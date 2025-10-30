export interface LightGreenBtnProps {
    label: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

export default function LightGreenBtn({onClick, label, className = ''}: LightGreenBtnProps) {

    return (
        <button
            onClick={onClick}
            className={`text-black cursor-pointer w-full font-semibold p-2 rounded-md myButtonColor ${className} `}
        >
            {label}
        </button>
    )
}