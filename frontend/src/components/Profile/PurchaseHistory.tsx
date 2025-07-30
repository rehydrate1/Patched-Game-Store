




export default function PurchaseHistory() {
    const purchases = [
        { id: 1, game: 'Cyberpunk 2077', date: '15 июня 2024', price: '2999 ₽' },
        { id: 2, game: 'The Witcher 3: Wild Hunt', date: '22 мая 2024', price: '1199 ₽' },
        { id: 3, game: 'Elden Ring', date: '10 апреля 2024', price: '3599 ₽' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">
                История покупок
            </h1>
            <p className="text-gray-400 mb-8">
                Список всех ваших приобретений в нашем магазине.
            </p>

            <div className="flow-root">
                <ul role="list" className="-my-4 divide-y divide-white/10">
                    {purchases.map((purchase) => (
                        <li key={purchase.id} className="flex items-center py-4">
                            <div className="flex-1">
                                <p className="text-white font-medium">{purchase.game}</p>
                                <p className="text-sm text-gray-400">{purchase.date}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-[#00FE92]">{purchase.price}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}