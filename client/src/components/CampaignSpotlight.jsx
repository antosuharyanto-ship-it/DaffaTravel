import React from 'react';
import { Sparkles, Heart, Users, Star } from 'lucide-react';

const campaigns = [
    {
        month: 'June 2025',
        title: 'Hajj Reflections',
        description: 'Post-Hajj spiritual planning and group reflection sessions for a more profound return journey.',
        icon: <Sparkles className="w-6 h-6" />,
        color: 'bg-emerald-500'
    },
    {
        month: 'July 2025',
        title: 'Sisters of Serenity',
        description: 'Exclusive women-friendly Umrah services with female guides and private spiritual circles.',
        icon: <Heart className="w-6 h-6" />,
        color: 'bg-pink-500'
    },
    {
        month: 'August 2025',
        title: 'Ramadan 2026 Early Bird',
        description: 'Secure your spiritual peak for next year with our Independence Day special offers.',
        icon: <Star className="w-6 h-6" />,
        color: 'bg-amber-500'
    }
];

const CampaignSpotlight = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2">Our 2025 Strategy</h2>
                    <h3 className="text-4xl font-serif text-slate-900 mb-6">Seasonal <span className="italic">Spiritual</span> Spotlights</h3>
                    <p className="text-slate-500 max-w-2xl leading-relaxed">
                        Each month, we focus on a unique aspect of the spiritual journey to ensure a deeper connection and a more holistic experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {campaigns.map((camp, idx) => (
                        <div key={idx} className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                            <div className="relative glass-card !bg-slate-50 p-8 h-full flex flex-col hover:translate-y-[-8px] transition-all duration-300">
                                <div className={`w-12 h-12 ${camp.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    {camp.icon}
                                </div>
                                <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">{camp.month}</div>
                                <h4 className="text-xl font-bold mb-4 text-slate-800">{camp.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 italic">
                                    "{camp.description}"
                                </p>
                                <button className="text-primary font-bold text-sm flex items-center group-hover:underline">
                                    View Campaign Details <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CampaignSpotlight;
