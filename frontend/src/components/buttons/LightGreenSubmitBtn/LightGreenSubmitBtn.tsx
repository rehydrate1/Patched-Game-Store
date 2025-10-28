import styles from "./LightGreenBtn.module.scss";

interface LightGreenSubmitBtnProps {
    label: string;
    disabled: boolean;
    className?: string;
}

export default function LightGreenSubmitBtn({label, disabled, className = ''}: LightGreenSubmitBtnProps) {

    return (
        <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent 
            rounded-md shadow-sm text-m font-medium cursor-pointer text-black ${className} ${styles.submitButton}`}
            disabled={disabled}
        >
            {label}
        </button>
    )
}