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
}



export default function MultiSelectDropdown({ label, options, value, onChange, placeholder = "" }: MultiSelectProps) {
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
                className={styles.multiSelectContainer}
                noOptionsMessage={() => "Ничего не найдено"}
            />
        </div>
    )
}