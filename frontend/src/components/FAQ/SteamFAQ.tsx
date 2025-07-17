
const faqData = [
    {
        question: "Как узнать свой логин Steam?",
        answer: "Ваш логин Steam — это имя, которое вы используете для входа в приложение Steam, а не ваш никнейм в профиле. Его можно посмотреть в правом верхнем углу клиента Steam."
    },
    {
        question: "Как быстро придут деньги?",
        answer: "Обычно пополнение происходит моментально, в течение 1-2 минут после успешной оплаты. В редких случаях из-за нагрузки на серверы Steam возможны задержки до 15 минут."
    },
    {
        question: "Какая у вас комиссия?",
        answer: "Наша комиссия составляет 10% от суммы пополнения. Она уже включена в итоговую сумму 'К оплате', вы видите конечную цену."
    },
    {
        question: "Что делать, если я ошибся логином?",
        answer: "К сожалению, мы не можем отменить платеж, отправленный на неверный логин. Пожалуйста, будьте предельно внимательны при вводе данных."
    }
];

const FaqItem = ({ question, children }) => {
    return (
        <details className="bg-[#2a2b30] border border-white/10 rounded-lg p-4 group">
            <summary className="flex items-center justify-between font-medium cursor-pointer list-none">
                <span>{question}</span>
                <span className="transition-transform duration-300 group-open:rotate-45 text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </summary>
            <div className="text-gray-300 mt-4 text-sm leading-relaxed">
                {children}
            </div>
        </details>
    );
};

export default function SteamFAQ() {
    return (
        <div className="space-y-4 lg:col-span-1">
            <h2 className="text-3xl font-bold mb-6">Частые вопросы</h2>
            {faqData.map((item, index) => (
                <FaqItem key={index} question={item.question}>
                    <p>{item.answer}</p>
                </FaqItem>
            ))}
        </div>
    );
}