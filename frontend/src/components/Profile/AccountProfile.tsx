

export default function AccountProfile() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">
                Ваш профиль
            </h1>
            <p className="text-gray-400 mb-8">
                Здесь вы можете посмотреть информацию о вашем аккаунте.
            </p>

            <div className="space-y-6 text-lg">
                <div className="flex flex-col sm:flex-row">
                    <span className="w-full sm:w-1/3 text-gray-400">Никнейм:</span>
                    <span className="font-medium text-white">User123</span>
                </div>
                <div className="border-t border-white/10"></div>
                <div className="flex flex-col sm:flex-row">
                    <span className="w-full sm:w-1/3 text-gray-400">Email:</span>
                    <span className="font-medium text-white">user@example.com</span>
                </div>
                <div className="border-t border-white/10"></div>
                <div className="flex flex-col sm:flex-row">
                    <span className="w-full sm:w-1/3 text-gray-400">Дата регистрации:</span>
                    <span className="font-medium text-white">01 января 2024</span>
                </div>
            </div>
        </div>
    );
}