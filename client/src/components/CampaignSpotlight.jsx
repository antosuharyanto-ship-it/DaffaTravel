import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Heart, Users, Star } from 'lucide-react';

const CampaignSpotlight = () => {
    const { t, language } = useLanguage();

    const icons = [
        <Sparkles className="w-6 h-6" />,
        <Heart className="w-6 h-6" />,
        <Star className="w-6 h-6" />
    ];

    const campaignItems = t('campaigns.items');

    return (
        <section className={`bg-white py-24 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className={`text-secondary font-black tracking-[0.2em] uppercase text-[10px] md:text-sm mb-2 flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <span>{t('campaigns.tag')}</span>
                        <span className="w-6 h-[1px] bg-secondary/30"></span>
                    </h2>
                    <div className="space-y-2">
                        <h3 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 underline decoration-secondary/30 underline-offset-8">
                            {t('campaigns.title')} <span className="italic">{t('campaigns.titleAccent')}</span> {t('campaigns.titleSuffix')}
                        </h3>
                    </div>
                    <p className="text-slate-500 max-w-2xl leading-relaxed font-light">
                        {t('campaigns.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {campaignItems.map((camp, idx) => (
                        <div key={idx} className="group relative">
                            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                            <div className="relative glass-card !bg-white border-white/40 p-10 h-full flex flex-col hover:translate-y-[-12px] transition-all duration-500 shadow-sm hover:shadow-2xl">
                                <div className={`w-16 h-16 ${idx === 0 ? 'bg-emerald-500' : idx === 1 ? 'bg-pink-500' : 'bg-amber-500'} text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-inner transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    {icons[idx]}
                                </div>
                                <div className="space-y-1 mb-4">
                                    <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{camp.month}</div>
                                </div>
                                <h4 className="text-2xl font-serif font-black mb-1 text-slate-900 group-hover:text-primary transition-colors">{camp.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-light italic opacity-80 group-hover:opacity-100">
                                    "{camp.desc}"
                                </p>
                                <button className={`group/link w-fit flex items-center text-primary font-bold text-xs uppercase tracking-widest relative ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <span>{t('campaigns.cta')}</span>
                                    <div className={`h-[1px] w-6 bg-primary/30 group-hover/link:w-10 group-hover/link:bg-primary transition-all duration-500 ${language === 'ar' ? 'mr-3' : 'ml-3'}`}></div>
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
