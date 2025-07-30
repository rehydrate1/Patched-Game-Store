"use client"

import {
    ShieldCheck,
    KeyRound,
    MessageSquareHeart,
    Zap,
    Users,
    DownloadCloud
} from 'lucide-react';
import MainLinkButton from "@/components/UI/Buttons/MainLinkButton/MainLinkButton";

export default function Guarantees() {


    return (
        <div className="text-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

                {/* --- Заголовок --- */}
                <div className="text-center pt-10 pb-30">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                        Ваша уверенность — наш приоритет
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
                        В Patched мы гарантируем безопасность каждой покупки и качество обслуживания. Узнайте, почему тысячи геймеров доверяют нам.
                    </p>
                </div>

                {/* --- Секция ключевых преимуществ --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pb-50">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0"><KeyRound className="h-10 w-10 text-[#00FE92]" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-white">100% лицензионные ключи</h3>
                            <p className="mt-2 text-slate-400">Работаем только с официальными издателями и дистрибьюторами</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0"><Zap className="h-10 w-10 text-[#00FE92]" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Моментальная доставка</h3>
                            <p className="mt-2 text-slate-400">Ключ на вашем email и в личном кабинете сразу после оплаты</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0"><ShieldCheck className="h-10 w-10 text-[#00FE92]" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Безопасные платежи</h3>
                            <p className="mt-2 text-slate-400">Все транзакции защищены современными протоколами шифрования</p>
                        </div>
                    </div>
                </div>

                {/* --- НОВЫЙ БЛОК: Как это работает? --- */}
                <div className="text-center mb-15">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-18">Всего 3 простых шага до новой игры</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative">
                        <div className="relative bg-slate-800/50 p-6 rounded-lg ring-1 ring-white/10 z-10">
                            <div className="flex items-center mb-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 ring-2 ring-[#00FE92] text-[#00FE92] font-bold text-lg mr-4">1</div>
                                <h3 className="text-xl font-bold">Выберите игру</h3>
                            </div>
                            <p className="text-slate-400">Найдите интересующую вас игру в нашем каталоге и добавьте её в корзину</p>
                        </div>
                        <div className="relative bg-slate-800/50 p-6 rounded-lg ring-1 ring-white/10 z-10">
                            <div className="flex items-center mb-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 ring-2 ring-[#00FE92] text-[#00FE92] font-bold text-lg mr-4">2</div>
                                <h3 className="text-xl font-bold">Оплатите заказ</h3>
                            </div>
                            <p className="text-slate-400">Используйте любой удобный и безопасный способ оплаты</p>
                        </div>
                        <div className="relative bg-slate-800/50 p-6 rounded-lg ring-1 ring-white/10 z-10">
                            <div className="flex items-center mb-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 ring-2 ring-[#00FE92] text-[#00FE92] font-bold text-lg mr-4">3</div>
                                <h3 className="text-xl font-bold">Активируйте ключ</h3>
                            </div>
                            <p className="text-slate-400">Получите ключ и активируйте его на соответствующей платформе (Steam, Epic и т.д.)</p>
                        </div>
                    </div>
                </div>

                {/* --- Секция "Почему выбирают нас" --- */}
                <div className="bg-slate-800/50 rounded-2xl p-8 sm:p-12 lg:p-16 ring-1 ring-white/10 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">Мы создали Patched для геймеров</h2>
                            <p className="text-slate-300">Наша миссия — сделать покупку игр простой, быстрой и максимально надёжной <br/> Мы сами любим игры и понимаем, что важно для каждого игрока</p>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-3"><MessageSquareHeart className="h-6 w-6 text-[#00FE92] flex-shrink-0" /><span>Отзывчивая поддержка 24/7</span></li>
                                <li className="flex items-center space-x-3"><DownloadCloud className="h-6 w-6 text-[#00FE92] flex-shrink-0" /><span>Гарантия активации ключа</span></li>
                                <li className="flex items-center space-x-3"><Users className="h-6 w-6 text-[#00FE92] flex-shrink-0" /><span>Сильное сообщество и акции</span></li>
                            </ul>
                        </div>
                        <div className="flex justify-center items-center p-8 bg-slate-900 rounded-xl">
                            <div className="text-center">
                                <p className="text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">50,000+</p>
                                <p className="mt-2 text-lg text-slate-300">Довольных геймеров</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* --- Призыв к действию (CTA) (без изменений) --- */}
                <div className="text-center mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Готовы начать?</h3>
                    <p className="text-slate-400 mb-10 max-w-3xl mx-auto">Присоединяйтесь к тысячам довольных клиентов и оцените все преимущества Patched прямо сейчас</p>
                    <MainLinkButton
                        link={'/shop/catalog/keys'}
                        text={'Перейти в каталог игр'}
                        className={'px-6 text-lg py-4 font-bold'}
                    />
                </div>

            </div>
        </div>
    );
}