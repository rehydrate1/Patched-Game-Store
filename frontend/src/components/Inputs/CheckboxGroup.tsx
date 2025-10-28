"use client"

type CheckboxGroupProps = {
    label: string; // Заголовок группы
    options: string[]; // Массив доступных вариантов (['Windows', 'macOS', 'Linux'])
    selectedOptions: string[]; // Массив уже выбранных вариантов
    onChange: (selected: string[]) => void; // Функция, которая вызывается при изменении выбора
}

export default function CheckboxGroup({ label, options, selectedOptions, onChange }: CheckboxGroupProps) {

    // Обработчик изменения состояния чекбокса
    const handleChange = (option: string) => {
        // Создаем копию массива выбранных опций, чтобы не мутировать стейт напрямую
        const newSelectedOptions = [...selectedOptions];

        if (newSelectedOptions.includes(option)) {
            // Если опция уже выбрана - удаляем ее из массива
            const index = newSelectedOptions.indexOf(option);
            newSelectedOptions.splice(index, 1);
        } else {
            // Если опция не выбрана - добавляем ее в массив
            newSelectedOptions.push(option);
        }

        // Вызываем функцию onChange из родительского компонента с новым массивом
        onChange(newSelectedOptions);
    };

    return (
        <div>
            {/* Заголовок для группы чекбоксов */}
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>

            {/* Контейнер для самих чекбоксов, используем flex для расположения */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {/* Проходимся по всем доступным опциям и создаем для каждой свой чекбокс */}
                {options.map((option) => (
                    <div key={option} className="flex items-center">
                        <input
                            id={option}
                            type="checkbox"
                            // Проверяем, есть ли текущая опция в массиве выбранных
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleChange(option)}
                            className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <label htmlFor={option} className="ml-2 block text-sm text-gray-200 cursor-pointer">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}