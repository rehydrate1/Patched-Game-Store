"use client"


import {useState} from "react";
import {ChevronDownIcon} from '@heroicons/react/24/outline';


export default function MainFAQ({faqData}) {

    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <>
            <div className="mx-auto max-w-4xl divide-y divide-white/10">
                {faqData.map((faq, index) => (
                    <div key={faq.question} className="py-6">
                        <button
                            onClick={() => toggleFaq(index)}
                            className="flex w-full items-start justify-between text-left text-white"
                        >
                            <span className="text-base font-semibold leading-7">{faq.question}</span>
                            <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                                className={`h-6 w-6 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                            />
                        </span>
                        </button>
                        <div className={`mt-4 pr-12 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}