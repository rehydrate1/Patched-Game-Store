import Link from 'next/link';
import { BugAntIcon, HomeIcon } from '@heroicons/react/24/outline';

export const metadata = {
    title: "Страница не найдена | 404 ",
    description: "Похоже, эта страница была вырезана в последнем патче. Но вы можете вернуться на главную.",
};

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center text-white">
            <div className="space-y-4">
                <BugAntIcon className="mx-auto h-16 w-16 text-[#00FE92]" />

                <h1 className="text-8xl font-bold font-mono text-[#00FE92]">404</h1>

                <h2 className="text-3xl font-semibold">Кажется, эту страницу <span className="text-[#00FE92]">вырезали</span> в последнем патче!</h2>

                <p className=" text-gray-400">
                    Но не волнуйтесь, наша команда уже готовит фикс. А пока вы можете вернуться на главную или посмотреть наш каталог игр.
                </p>

                <div className="flex justify-center gap-4 pt-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-md myButtonColor px-5 py-3 text-sm font-medium text-white transition-colors focus:outline-none"
                    >
                        <HomeIcon className="h-5 w-5" />
                        На главную
                    </Link>
                </div>
            </div>
        </main>
    );
}