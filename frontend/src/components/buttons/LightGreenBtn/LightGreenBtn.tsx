import {memo} from "react";

export interface LightGreenBtnProps {
    label: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

function LightGreenBtn({onClick, label, className = ''}: LightGreenBtnProps) {

    return (
        <button
            onClick={onClick}
            className={`text-black cursor-pointer w-full font-semibold p-2 rounded-md myButtonColor ${className} `}
        >
            {label}
        </button>
    )
}

export default memo(LightGreenBtn);