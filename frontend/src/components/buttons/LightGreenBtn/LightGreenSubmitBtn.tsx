import {LightGreenBtnProps} from "@/components/buttons/LightGreenBtn/LightGreenBtn";


export default function LightGreenSubmitBtn({label, disabled = false, className = ''}: LightGreenBtnProps) {

    return (
        <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent 
            rounded-md shadow-sm text-m font-medium cursor-pointer text-black myButtonColor ${className} `}
            disabled={disabled}
        >
            {label}
        </button>
    )
}