import { useState } from 'react';

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: "What services do you offer?",
            answer: "We offer a variety of cleaning services including basic cleaning, deep cleaning, move-in/move-out cleaning, window cleaning, and carpet cleaning. Each service is tailored to meet your specific needs and ensure your space is spotless."
        },
        {
            question: "How do you calculate pricing?",
            answer: "Our pricing is based on the square footage of the area to be cleaned. Different services have different rates per square foot. Additional factors like heavy staining or pet treatments may incur additional charges. You can use our calculator tool to get an estimate for your specific needs."
        },
        {
            question: "Do I need to provide cleaning supplies?",
            answer: "No, we bring all necessary cleaning supplies and equipment. However, if you prefer specific products to be used in your home, please let us know in advance and we'll be happy to accommodate your preferences."
        },
        {
            question: "How long does a typical cleaning take?",
            answer: "The duration depends on the size of your space and the type of service. A basic cleaning for an average-sized home typically takes 1-2 hours, while deep cleaning may take 2-4 hours. Our booking system will provide an estimated duration based on your selections."
        },
        {
            question: "What areas do you service?",
            answer: "We currently service Seattle, Bellevue, Redmond, Kirkland, and Renton areas. Each location has a specific coverage radius. Check our Service Areas page for more detailed information about coverage in your specific zip code."
        },
        {
            question: "How do I schedule a cleaning?",
            answer: "You can schedule a cleaning through our Bookings page. Select your preferred service, date, and time, provide your information, and make a deposit to secure your booking. You'll receive a confirmation email with all the details."
        },
        {
            question: "What is your cancellation policy?",
            answer: "We require at least 24 hours notice for cancellations. Cancellations made with less than 24 hours notice may forfeit the deposit fee. We understand that emergencies happen, so please contact us as soon as possible if you need to reschedule."
        },
        {
            question: "Do you offer recurring cleaning services?",
            answer: "Yes, we offer weekly, bi-weekly, and monthly recurring cleaning services. Regular clients receive priority scheduling and special discounted rates. Contact us for more information about setting up a recurring cleaning schedule."
        }
    ];

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>

            <div className="space-y-4">
                {faqItems.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-base-200 rounded-lg overflow-hidden shadow-md"
                    >
                        <button
                            className="w-full flex justify-between items-center p-4 text-left font-medium text-lg focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <svg
                                className={`w-5 h-5 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div
                            className={`px-4 pb-4 transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                        >
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <div className="bg-base-200 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
                    <p className="mb-6">Our customer service team is ready to help you with any other questions you might have.</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-focus">Contact Us</button>
                        <button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-base-300">Call (555) 123-4567</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
