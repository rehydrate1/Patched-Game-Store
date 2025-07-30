"use client"

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


import MainFAQ from "@/components/FAQ/MainFAQ";
import TextPressure from "@/components/UI/Modern/TextPressure";
import Image from "next/image";
import MainPrivilegeCards from "@/components/PrivilegeCards/MainPrivilegeCard";
import Link from "next/link";
import Aurora from "@/components/UI/Modern/Aurora";
import Feedback from "@/components/Feedback/Feedback";
import {
    DashboardFaqData,
    DashboardArrayOfData,
    DashboardTestimonialsData,
    DashboardPrivileges
} from "@/app/page";

const icons = {
    TagIcon: TagIcon,
    GiftIcon: GiftIcon,
    SparklesIcon: SparklesIcon,
    RocketLaunchIcon: RocketLaunchIcon,
    ClockIcon: ClockIcon,
    ShieldCheckIcon: ShieldCheckIcon,
}

interface DashboardProps {
    arrayOfData: DashboardArrayOfData[];
    faqData: DashboardFaqData[];
    testimonialsData: DashboardTestimonialsData[];
    privileges: DashboardPrivileges[];
}

export default function Dashboard({arrayOfData, faqData, testimonialsData, privileges}:DashboardProps) {
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
                            {arrayOfData.map(game => (
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
                            {privileges.map(privilege => {
                                const IconComponent = icons[privilege.icon]
                                return (
                                    <MainPrivilegeCards
                                        key={privilege.title}
                                        title={privilege.title}
                                        icon={IconComponent}
                                        text={privilege.text}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </section>

                <Feedback testimonials={testimonialsData} />


                <section className="py-20 mt-15 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Часто задаваемые вопросы</h2>
                        </div>
                        <div className="mt-14">
                            <MainFAQ faqData = {faqData} />
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}