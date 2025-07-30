
interface SteamInputProps {
    placeholder?: string,
    id: string,
    value: string,
    onChange: (newValue: string) => void;
    label: string
    error?: string;
}


export default function SteamInput({ id, placeholder = '', value, label, onChange, error }: SteamInputProps) {

    return (
        <>
            <input
                type="text"
                id={id}
                placeholder={placeholder}
                className="peer w-full bg-transparent pt-3 pb-2 px-1 border-b-2 border-gray-600
                outline-none transition-color focus:border-green-400 focus:placeholder-transparent"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <label
                htmlFor={id}
                className="absolute left-1 top-3 text-gray-400 transition-all pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-sm
                peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:text-gray-400
                peer-[&:not(:placeholder-shown)]:text-sm"
            >
                {label}
            </label>

            {error && (
                <p className="mt-2 text-xs text-red-400">{error}</p>
            )}
        </>
    )
}