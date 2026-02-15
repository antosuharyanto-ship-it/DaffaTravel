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
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <h4 className="text-secondary font-black tracking-[0.3em] uppercase text-[10px] md:text-sm animate-fade-in flex items-center gap-3">
                                <span>Experience Excellence</span>
                                <span className="w-6 h-[1px] bg-secondary/30"></span>
                                <span className="text-secondary/80">Keunggulan Layanan</span>
                            </h4>
                            <div className="space-y-2">
                                <span className="block text-2xl md:text-4xl font-normal text-white/60 font-arabic" dir="rtl">لماذا تختارنا؟</span>
                                <h2 className="text-5xl md:text-7xl font-serif font-black leading-tight tracking-tighter text-white">
                                    Find Your <span className="text-secondary italic">Inner Peace</span> with Us
                                </h2>
                            </div>
                        </div>
                        <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">
                            We go beyond booking flights and hotels. We provide a sacred journey crafted with care, expertise, and a commitment to your spiritual well-being.
                        </p>
                        <button className="group flex items-center space-x-4 text-white hover:text-secondary transition-colors duration-300">
                            <span className="text-sm font-bold uppercase tracking-widest">Discover our Story</span>
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-secondary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {reasons.map((reason, idx) => (
                            <div key={idx} className="glass-card !bg-white/5 border-white/5 p-10 hover:!bg-white/10 hover:border-white/20 transition-all duration-500 group transform hover:-translate-y-2">
                                <div className="mb-8 p-4 w-16 h-16 bg-white/5 rounded-2xl group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-500">
                                    {reason.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-4">{reason.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
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
