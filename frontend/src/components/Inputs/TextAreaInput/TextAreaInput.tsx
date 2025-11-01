import styles from "./TextAreaInput.module.scss"

interface TextAreaInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    rows?: number;
    placeholder?: string;
    className?: string;
    required?: boolean;
    error?: string;
}

export default function TextAreaInput({id, label, value, onChange, placeholder = '',
                                          rows = 4, required = false, className = '', error}:TextAreaInputProps ){

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-white">
                {label}
            </label>
            <textarea
                id={id}
                name={id}
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${styles.descriptionTextarea} 
                ${error ? 'border-red-500' : 'border-gray-600'} ${className}`}
                placeholder={placeholder}
            />

            {error && (
                <p className="mt-1 pl-1 text-xs text-red-400">{error}</p>
            )}
        </div>
    )
}