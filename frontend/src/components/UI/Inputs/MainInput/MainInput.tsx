interface MainInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    className?: string;
    type?: string;
    required?: boolean;
}
import styles from "./MainInput.module.scss";

export default function MainInput({id, label, value, onChange, placeholder = '',
                                      className = '', type ='text', required = true}:MainInputProps ){


    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-white">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600
                    ${styles.inputField} ${className}`}
                placeholder={placeholder}
            />
        </div>
    )
}