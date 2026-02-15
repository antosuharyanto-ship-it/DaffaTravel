import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Clock, MapPin, Award } from 'lucide-react';

const WhyChooseUs = () => {
    const { t, language } = useLanguage();

    const icons = [
        <ShieldCheck className="w-8 h-8 text-secondary" />,
        <Clock className="w-8 h-8 text-secondary" />,
        <MapPin className="w-8 h-8 text-secondary" />,
        <Award className="w-8 h-8 text-secondary" />
    ];

    const reasons = t('whyChooseUs.reasons');

    return (
        <section className="bg-slate-900 py-24 text-white overflow-hidden">
            <div className={`container mx-auto px-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className={`flex flex-col lg:flex-row items-center gap-20 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <h4 className="text-secondary font-black tracking-[0.3em] uppercase text-[10px] md:text-sm animate-fade-in flex items-center gap-3">
                                <span>{t('whyChooseUs.tag')}</span>
                                <span className="w-6 h-[1px] bg-secondary/30"></span>
                            </h4>
                            <div className="space-y-2">
                                <h2 className="text-5xl md:text-7xl font-serif font-black leading-tight tracking-tighter text-white">
                                    {t('whyChooseUs.title')} <span className="text-secondary italic">{t('whyChooseUs.titleAccent')}</span> {t('whyChooseUs.titleSuffix')}
                                </h2>
                            </div>
                        </div>
                        <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">
                            {t('whyChooseUs.description')}
                        </p>
                        <button className={`group flex items-center space-x-4 text-white hover:text-secondary transition-colors duration-300 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <span className="text-sm font-bold uppercase tracking-widest">{t('whyChooseUs.cta')}</span>
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-secondary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {reasons.map((reason, idx) => (
                            <div key={idx} className="glass-card !bg-white/5 border-white/5 p-10 hover:!bg-white/10 hover:border-white/20 transition-all duration-500 group transform hover:-translate-y-2">
                                <div className="mb-8 p-4 w-16 h-16 bg-white/5 rounded-2xl group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-500">
                                    {icons[idx]}
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-4">{reason.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {reason.desc}
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
