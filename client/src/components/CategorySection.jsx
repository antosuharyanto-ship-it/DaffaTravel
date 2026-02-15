import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import umrahBg from '../assets/umrah_bg.jpg';
import holidayBg from '../assets/holiday_bg.jpg';

const CategorySection = () => {
    const { t, language } = useLanguage();

    const categories = [
        { id: 'umrah', bg: umrahBg, icon: '🕋', path: '/packages?category=UMRAH' },
        { id: 'hajj', bg: umrahBg, icon: '🌙', path: '/packages?category=HAJJ' },
        { id: 'holiday', bg: holidayBg, icon: '✈️', path: '/packages?category=HOLIDAY' }
    ];

    return (
        <section className={`container mx-auto px-4 py-20 relative z-20 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        to={cat.path}
                        className="relative group h-80 rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/30 transition-all duration-500 transform hover:-translate-y-2"
                    >
                        {/* Background with Zoom Effect */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${cat.bg})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                {cat.icon}
                            </div>
                            <div className="space-y-1 mb-2">
                                <h3 className="text-2xl font-serif text-white font-black tracking-tight group-hover:text-secondary transition-colors duration-300">
                                    {t(`categories.${cat.id}.title`)}
                                </h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                {t(`categories.${cat.id}.description`)}
                            </p>
                            <div className={`flex items-center text-white/80 group-hover:text-secondary font-bold tracking-widest uppercase text-[10px] transition-all duration-300 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <span>{t('campaigns.cta')}</span>
                                <div className={`h-[1px] w-8 bg-white/30 group-hover:w-12 group-hover:bg-secondary transition-all duration-500 ${language === 'ar' ? 'mr-3' : 'ml-3'}`}></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
