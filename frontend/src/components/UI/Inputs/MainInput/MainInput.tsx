interface MainInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    className?: string;
    type?: string;
    required?: boolean;
    error?: string;
}

export default function MainInput({id, label, value, onChange, placeholder = '',
                                      className = '', type ='text', required = false, error}:MainInputProps ){



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
                className={`mt-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none 
                sm:text-sm ${error ? 'border-red-500' : 'border-gray-600'} mainInput ${className}`}
                placeholder={placeholder}
            />

            {error && (
                <p className="mt-1 pl-1 text-xs text-red-400">{error}</p>
            )}
        </div>
    )
}