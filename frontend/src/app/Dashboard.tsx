"use client";


import {
    ShoppingCartIcon,
    TagIcon,
    ShieldCheckIcon,
    GiftIcon,
    RocketLaunchIcon,
    ClockIcon,
    SparklesIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './Dashboard.module.scss'
import TextPressure from "@/components/UI/Modern/TextPressure";
import Image from "next/image";
import MainPrivilegeCards from "@/components/PrivilegeCards/MainPrivilegeCard";
import Link from "next/link";
import Aurora from "@/components/UI/Modern/Aurora";
import Feedback from "@/components/Feedback/Feedback";


const privileges = [
    {
        icon: TagIcon,
        title: 'Лучшие цены',
        text: 'Экономьте на каждой покупке благодаря нашим эксклюзивным скидкам и регулярным распродажам'
    },
    {
        icon: GiftIcon,
        title: 'Моментальная доставка',
        text: 'Не ждите ни секунды! Ключ от игры появится в вашем личном кабинете сразу после подтверждения оплаты'
    },
    {
        icon: SparklesIcon,
        title: 'Игры в день релиза',
        text: 'Получайте доступ к самым ожидаемым новинкам в день их официального выхода и начинайте играть вместе со всем миром'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Быстрое пополнение',
        text: 'Пополняйте баланс вашего Steam аккаунта за считанные секунды с помощью удобных и безопасных платежных систем'
    },
    {
        icon: ClockIcon,
        title: 'Круглосуточная поддержка',
        text: 'Наша команда поддержки доступна 24/7 и готова оперативно решить любой ваш вопрос в чате или по почте'
    },
    {
        icon: ShieldCheckIcon,
        title: 'Надежный сервис',
        text: 'Мы работаем только с официальными издателями, гарантируя легальность и работоспособность каждого ключа'
    },
];

const testimonialsData = [
    {
        id: 1,
        author: 'Alex_Gamer',
        avatar: 'https://i.pravatar.cc/48?u=alex_gamer',
        game: 'Cyberpunk 2077',
        rating: 5,
        text: 'Ключ пришел моментально, даже не успел чайник вскипеть! Все активировалось без проблем. Спасибо, Patched, теперь только к вам!'
    },
    {
        id: 2,
        author: 'Elena_Swift',
        avatar: 'https://i.pravatar.cc/48?u=elena_swift',
        game: 'Elden Ring',
        rating: 5,
        text: 'Очень боялась покупать ключи в интернете, но тут все прошло гладко. Цена была самой низкой из всех, что я нашла. Поддержка ответила на мой вопрос за 5 минут. Супер!'
    },
    {
        id: 3,
        author: 'MadMax_Play',
        avatar: 'https://i.pravatar.cc/48?u=madmax_play',
        game: 'Baldur\'s Gate 3',
        rating: 5,
        text: 'Пополнил Стим через этот сайт, деньги пришли сразу же. Удобно, быстро и без заморочек с зарубежными картами. Настоящее спасение.'
    },
    {
        id: 4,
        author: 'GamerGirl94',
        avatar: 'https://i.pravatar.cc/48?u=GamerGirl94',
        game: 'Helldivers 2',
        rating: 5,
        text: 'Купила ключ для Helldivers 2, активация в Steam прошла успешно. Цена порадовала, ниже чем у конкурентов. Буду брать еще!'
    },
    {
        id: 5,
        author: 'S_T_A_L_K_E_R',
        avatar: 'https://i.pravatar.cc/48?u=S_T_A_L_K_E_R',
        game: 'Escape from Tarkov',
        rating: 5,
        text: 'Все четко и быстро. Ключ пришел на почту через минуту после оплаты. Сервис на высшем уровне, рекомендую.'
    },
    {
        id: 6,
        author: 'Dmitry_S',
        avatar: 'https://i.pravatar.cc/48?u=Dmitry_S',
        game: 'Starfield',
        rating: 4,
        text: 'Немного волновался, так как покупал впервые. Но все прошло отлично. Единственное, ждал ключ минут 15, но в остальном все супер.'
    },
    {
        id: 7,
        author: 'Katya_Stream',
        avatar: 'https://i.pravatar.cc/48?u=Katya_Stream',
        game: 'Lethal Company',
        rating: 5,
        text: 'Брали с друзьями сразу 4 ключа для Lethal Company. Все пришли моментально, уже играем! Спасибо за отличные цены и скорость!'
    },
    {
        id: 8,
        author: 'Old_Gamer',
        avatar: 'https://i.pravatar.cc/48?u=Old_Gamer',
        game: 'Пополнение Steam',
        rating: 5,
        text: 'Отличный способ пополнить кошелек Steam. Комиссия адекватная, деньги зачисляются практически мгновенно. Теперь не нужно просить друзей из-за границы.'
    }
];

export default function Dashboard({products}) {
    return (
        <div className="min-h-screen">

            <header className="relative min-h-screen flex items-center justify-center overflow-hidden">

                <div className="absolute inset-0 z-0">
                    <Aurora
                        colorStops={["#099f5f", "#00FE92", "#00d17a"]}
                        amplitude={0.6}
                        speed={0.9}
                        blend={0.45}
                    />
                </div>

                <div className="relative z-10 text-center w-full flex flex-col items-center">
                    <div className="w-full max-w-7xl">
                        <TextPressure
                            text="PATCHED"
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="#ffffff"
                            minFontSize={60}
                        />
                    </div>
                </div>
            </header>


            <main className="py-20">


                <section id="popular-games" className="mb-35 relative">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-20 text-white">Сейчас в топе продаж</h2>

                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            loop={true}
                            spaceBetween={32}
                            breakpoints={{
                                640: {slidesPerView: 1, spaceBetween: 20},
                                768: {slidesPerView: 2, spaceBetween: 30},
                                1024: {slidesPerView: 4, spaceBetween: 32},
                            }}
                            className="!pb-10"
                        >
                            {products.map(game => (
                                <SwiperSlide key={game.id}>
                                    <div className="group relative bg-[#1A1129] rounded-xl overflow-hidden
                                                     border border-transparent hover:border-[#aeb2ae] transition-all duration-300 h-full flex flex-col">
                                        <Image src={game.picture} alt={game.name} width={1920} height={1080}
                                               className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"/>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-4 w-full">
                                            <Link href={`/shop/catalog/keys/${game.id}`}>
                                                <h1 className="text-2xl font-bold hover:text-green-400 text-white">{game.name}</h1>
                                            </Link>

                                            <div className="flex items-baseline gap-2 mt-2">
                                                <p className="text-2xl font-bold text-white">{game.price} ₽</p>
                                            </div>

                                            <button className="mt-6 w-full bg-[#00FE92] hover:bg-[#099f5f] cursor-pointer text-black font-bold py-2 rounded-lg
                                                             flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100
                                                             transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                <ShoppingCartIcon className="h-5 w-5"/> В корзину
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="swiper-button-prev-custom absolute top-1/2 left-4 xl:left-12 2xl:left-24 transform
                                z-10 cursor-pointer p-2 bg-[#212227]/80  hover:bg-[#00FE92] hover:text-black rounded-full backdrop-blur-sm
                                transition-all duration-300 hidden md:block">
                        <ChevronLeftIcon className="h-10 w-10 text-white hover:text-black "/>
                    </div>
                    <div className={`swiper-button-next-custom absolute top-1/2 right-4 xl:right-12 2xl:right-24 transform
                                z-10 cursor-pointer p-2 bg-[#212227]/80  hover:bg-[#00FE92] hover:text-black rounded-full backdrop-blur-sm
                                transition-all duration-300 hidden md:block`}>
                        <ChevronRightIcon className="h-10 w-10 text-white hover:text-black"/>
                    </div>
                </section>


                <section id="why-us" className="mb-5">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-20 text-white">Почему Patched?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {privileges.map(privilege => (
                                <MainPrivilegeCards
                                    key={privilege.title}
                                    title={privilege.title}
                                    icon={privilege.icon}
                                    text={privilege.text}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <Feedback testimonials={testimonialsData} />


            </main>
        </div>
    );
}