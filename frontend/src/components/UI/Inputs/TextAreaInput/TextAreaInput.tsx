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
}


export default function TextAreaInput({id, label, value, onChange, placeholder = '',
                                          rows = 4, required = true, className = ''}:TextAreaInputProps ){


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
                 ${className}`}
                placeholder={placeholder}
            />
        </div>
    )
}