"use client"

import Select, { StylesConfig } from 'react-select';

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

// Стили для темной темы, чтобы компонент вписался в твой дизайн
const customStyles: StylesConfig<SelectOption, true> = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#38393D',
        borderColor: '#38393D',
        color: 'white',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#aeb2ae',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#38393D',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#d40000' : state.isFocused ? '#014d23' : 'transparent', // bg-indigo-600 for selected
        color: 'white',
        '&:active': {
            backgroundColor: '#aeb2ae', // active:bg-indigo-700
        },
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#014d23', // bg-indigo-600
        color: 'white',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'white',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: 'white',
        '&:hover': {
            backgroundColor: '#014d23', // indigo-700
            color: 'white',
        },
    }),
    input: (provided) => ({
        ...provided,
        color: 'white',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'white', // text-gray-400
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
};


export default function MultiSelectDropdown({ label, options, value, onChange, placeholder = "Выберите..." }: MultiSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
                {label}
            </label>
            <Select
                isMulti // <-- Самый важный проп, включает режим мульти-выбора
                options={options} // Наши опции
                value={value} // Текущие выбранные значения
                onChange={(selected) => onChange(selected as SelectOption[])} // Обработчик изменений
                styles={customStyles} // Применяем наши кастомные стили
                placeholder={placeholder}
                noOptionsMessage={() => "Ничего не найдено"}
            />
        </div>
    )
}