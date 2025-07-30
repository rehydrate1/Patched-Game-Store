"use client"

import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

interface HideInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    error?: string;
}



export default function HideInput({label, id, required = false, value,
                                   onChange, error, placeholder, className = '' }: HideInputProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);


    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-white">
                {label}
            </label>
            <div className="relative mt-2">
                <input
                    id={id}
                    name={id}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required = {required}
                    placeholder={placeholder}
                    className={`block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md 
                    shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm mainInput ${className}
                    ${error ? 'border-red-500' : 'border-gray-600'} `}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />

                {error && (
                    <p className="mt-1 pl-1 text-xs text-red-400">{error}</p>
                )}

                <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 mb-5 text-gray-400" aria-hidden="true" />
                    ) : (
                        <EyeIcon className="h-5 w-5 mb-5 text-gray-400" aria-hidden="true" />
                    )}
                </div>
            </div>
        </div>
    )
}