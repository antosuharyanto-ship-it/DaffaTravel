import React from 'react';
import { ShieldCheck, Clock, MapPin, Award } from 'lucide-react';

const reasons = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
        title: 'Spiritual Serenity',
        description: 'Focus solely on your worship while we handle every logistic with precision and care.'
    },
    {
        icon: <Clock className="w-8 h-8 text-secondary" />,
        title: 'Holistic Guidance',
        description: 'Dedicated spiritual guides provide 24/7 assistance for a deeper, more meaningful journey.'
    },
    {
        icon: <MapPin className="w-8 h-8 text-secondary" />,
        title: 'Calm Sanctuary',
        description: 'Hand-picked accommodations within easy reach of the Haram, ensuring peace of mind.'
    },
    {
        icon: <Award className="w-8 h-8 text-secondary" />,
        title: 'Appreciate Yourself',
        description: 'An elite travel experience designed to honor your individual spiritual goals.'
    }
];

const WhyChooseUs = () => {
    return (
        <section className="bg-slate-900 py-24 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                            Find Your <span className="text-secondary italic">Inner Peace</span> with Us
                        </h2>
                        <div className="w-20 h-1 bg-secondary rounded-full"></div>
                        <p className="text-slate-400 text-lg max-w-lg">
                            We go beyond booking flights and hotels. We provide a sacred journey crafted with care, expertise, and a commitment to your spiritual well-being.
                        </p>
                        <button className="btn-secondary !bg-transparent border-2 border-secondary hover:!bg-secondary mt-4">
                            Learn More About Us
                        </button>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {reasons.map((reason, idx) => (
                            <div key={idx} className="glass-card !bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-colors">
                                <div className="mb-4">{reason.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {reason.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
