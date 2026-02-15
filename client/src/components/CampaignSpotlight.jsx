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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {campaigns.map((camp, idx) => (
                        <div key={idx} className="group relative">
                            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                            <div className="relative glass-card !bg-white border-white/40 p-10 h-full flex flex-col hover:translate-y-[-12px] transition-all duration-500 shadow-sm hover:shadow-2xl">
                                <div className={`w-16 h-16 ${camp.color} text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-inner transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    {camp.icon}
                                </div>
                                <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-3">{camp.month}</div>
                                <h4 className="text-2xl font-serif font-black mb-4 text-slate-900 group-hover:text-primary transition-colors">{camp.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-light italic opacity-80 group-hover:opacity-100">
                                    "{camp.description}"
                                </p>
                                <button className="group/link w-fit flex items-center text-primary font-bold text-xs uppercase tracking-widest relative">
                                    <span>Explore Intent</span>
                                    <div className="ml-3 h-[1px] w-6 bg-primary/30 group-hover/link:w-10 group-hover/link:bg-primary transition-all duration-500"></div>
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
