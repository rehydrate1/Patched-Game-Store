import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide,  } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, A11y, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import StarRating from "@/components/elements/StarRating";
import {DashboardTestimonialsDataStructure} from "@/lib/data/dashboardData";


export default function Feedback({ testimonials }: {testimonials: DashboardTestimonialsDataStructure[]}) {
    return (
        <section id="testimonials" className="mt-50 overflow-hidden">
            <div className="relative">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-20 text-white">Что говорят наши геймеры</h2>

                    <Swiper
                        modules={[Navigation, A11y, Pagination]}

                        pagination={{
                            el: '.feedback-pagination',
                            clickable: true,
                            // Явно указываем, как рендерить каждую точку, чтобы избежать конфликта с loop:true
                            renderBullet: function (index, className) {
                                return `<span class="${className}"></span>`;
                            },
                        }}

                        navigation={{
                            nextEl: '.swiper-button-next-feedback',
                            prevEl: '.swiper-button-prev-feedback',
                        }}
                        loop={true}
                        spaceBetween={32}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1280: { slidesPerView: 3, spaceBetween: 32 },
                        }}
                        className="!pb-16"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id} className="!h-auto">
                                <div
                                    className="bg-[#212227] rounded-xl p-6 flex flex-col h-full
                                               border border-gray-800 hover:border-[#aeb2ae]
                                               transition-all duration-300 transform "
                                >
                                    <div className="flex-grow">
                                        <div className="flex items-center mb-4">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.author}
                                                width={48}
                                                height={48}
                                                className="rounded-full mr-4 border-2 border-gray-600"
                                            />
                                            <div>
                                                <p className="font-bold text-white">{testimonial.author}</p>
                                                <p className="text-sm text-gray-400">Покупка: {testimonial.game}</p>
                                            </div>
                                        </div>
                                        <StarRating rating={testimonial.rating} />
                                        <blockquote className="mt-4 text-gray-300 italic">
                                            {/* Ограничиваем количество строк для предсказуемого вида */}
                                            <p className="line-clamp-4 text-xl">“{testimonial.text}”</p>
                                        </blockquote>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="feedback-pagination flex justify-center space-x-2 md:hidden"></div>
                </div>
                <div className="swiper-button-prev-feedback absolute top-1/2 left-4 xl:left-12 2xl:left-24 transform
                                z-10 cursor-pointer p-2 bg-[#212227]/80  hover:bg-[#00FE92] hover:text-black rounded-full backdrop-blur-sm
                                transition-all duration-300 hidden md:block">
                    <ChevronLeftIcon className="h-10 w-10 text-white hover:text-black" />
                </div>
                <div className="swiper-button-next-feedback absolute top-1/2 right-4 xl:right-12 2xl:right-24 transform
                                z-10 cursor-pointer p-2 bg-[#212227]/80  hover:bg-[#00FE92] hover:text-black rounded-full backdrop-blur-sm
                                transition-all duration-300 hidden md:block">
                    <ChevronRightIcon className="h-10 w-10 text-white hover:text-black" />
                </div>
            </div>
        </section>
    );
}