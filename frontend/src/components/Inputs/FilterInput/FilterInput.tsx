import styles from "./FilterInput.module.scss";

interface FilterInputProps {
    id: string;
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    className?: string;
    type?: string;
    required?: boolean;
    error?: string;
    min?: string;
}

export default function FilterInput({type = 'text', id, onChange, value, placeholder,
                                     className = '', required = false, min = '0'}: FilterInputProps){

    return (
        <input
            type={type}
            value={value}
            id={id}
            name={id}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            min={min}
            className={`w-full text-white text-sm rounded-lg focus:outline-none ${className} ${styles.searchInput} p-2.5`}
        />
    )
}