import { FaDiscord, FaTelegramPlane, FaVk } from 'react-icons/fa';
import FooterNavItem from "@/components/UI/navItems/FooterNavItem";

export default function MainFooter() {


    return (
        <footer className="text-gray-300 mt-30">
            <div className="container mx-auto py-20 px-4 sm:px-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">

                    <div className="md:col-span-2 lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Patched
                        </h2>
                        <p className="text-sm text-gray-400 mb-6 max-w-xs">
                            Ваш надежный портал в цифровой мир
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 transition-all duration-300 transform hover:text-white hover:-translate-y-1 hover:scale-110" aria-label="Discord">
                                <FaDiscord size={24} />
                            </a>
                            <a href="#" className="text-gray-400 transition-all duration-300 transform hover:text-white hover:-translate-y-1 hover:scale-110" aria-label="Discord">
                                <FaTelegramPlane size={24} />
                            </a>
                            <a href="#" className="text-gray-400 transition-all duration-300 transform hover:text-white hover:-translate-y-1 hover:scale-110" aria-label="Discord">
                                <FaVk size={24} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Магазин</h3>
                        <ul className="space-y-4 mt-4">
                            <FooterNavItem text={'Магазин игр'} link={'/shop/catalog/keys'} />
                            <FooterNavItem text={'Пополнение Steam'} link={'/steam-balance'} />
                            <FooterNavItem text={'Корзина'} link={'/shop/cart'} />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Информация</h3>
                        <ul className="space-y-4 mt-4">
                            <FooterNavItem text={'Гарантии'} link={'/'} />
                            <FooterNavItem text={'Поддержка'} link={'/support'} />
                            <FooterNavItem text={'О нас'} link={'/about'} />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Помощь</h3>
                        <ul className="space-y-4 mt-4">
                            <FooterNavItem text={'FAQ'} link={'/faq'} />
                            <FooterNavItem text={'Как сделать заказ?'} link={'/'} />
                            <FooterNavItem text={'Контакты'} link={'/contact'} />
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
                    <p>© {new Date().getFullYear()} Patched. Все права защищены.</p>
                </div>
            </div>

        </footer>
    );
}