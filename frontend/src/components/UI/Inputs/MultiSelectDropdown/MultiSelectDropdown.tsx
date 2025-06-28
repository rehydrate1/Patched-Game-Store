"use client"

import Select, { StylesConfig } from 'react-select';
import styles from './MultiSelectDropdown.module.scss';

// Тип для опций, react-select требует формат { value: '...', label: '...' }
export type SelectOption = {
    value: string;
    label: string;
};

// Пропсы нашего компонента
type MultiSelectProps = {
    label: string;
    options: SelectOption[];
    value: SelectOption[];
    onChange: (selected: SelectOption[]) => void;
    placeholder?: string;
    error?: string;
}



export default function MultiSelectDropdown({ label, options, value, onChange, placeholder = "", error }: MultiSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-white mb-1">
                {label}
            </label>
            <Select
                isMulti // <-- Самый важный проп, включает режим мульти-выбора
                options={options} // Наши опции
                value={value} // Текущие выбранные значения
                onChange={(selected) => onChange(selected as SelectOption[])} // Обработчик изменений
                classNamePrefix="custom-select"
                placeholder={placeholder}
                className={`${styles.multiSelectContainer} ${error ? 'border-red-500' : 'border-gray-600'}`}
                noOptionsMessage={() => "Ничего не найдено"}
            />

            {error && (
                <p className="mt-1 pl-1 text-xs text-red-400">{error}</p>
            )}
        </div>
    )
}