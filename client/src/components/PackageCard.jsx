import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, Star } from 'lucide-react';

const PackageCard = ({ pkg }) => {
    const { t, language } = useLanguage();
    // Determine hotel stars array
    const stars = Array.from({ length: pkg.hotelStars || 3 }, (_, i) => i);

    return (
        <div className={`glass-card group overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 bg-white border border-slate-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {/* Image Section - Focuses on Promo Flyer */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={pkg.flyerImage || pkg.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80'}
                    alt={pkg.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'}`}>
                    <span className="px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        {pkg.category}
                    </span>
                </div>

                {/* Hotel Stars Overlay */}
                <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} flex space-x-0.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg`}>
                    {stars.map((n) => (
                        <Star key={n} size={10} className="fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1 bg-white relative">
                <div className="mb-4">
                    <h3 className="text-xl font-serif font-black text-slate-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                        {pkg.title}
                    </h3>
                </div>

                <div className={`flex items-center gap-4 mb-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center px-2 py-1 bg-slate-50 rounded-md">
                        <Clock size={12} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-secondary`} />
                        <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center px-2 py-1 bg-slate-50 rounded-md">
                        <Users size={12} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-secondary`} />
                        <span>{pkg.availableSlots} {t('packages.left')}</span>
                    </div>
                </div>

                <div className={`mt-auto pt-6 border-t border-slate-100 flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{t('packages.investment')}</span>
                        <div className={`text-2xl font-serif font-black text-primary flex items-baseline ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span className={`text-xs ${language === 'ar' ? 'ml-1' : 'mr-1'} opacity-50`}>Rp</span>
                            {new Intl.NumberFormat('id-ID').format(pkg.price)}
                        </div>
                    </div>
                    <Link
                        to={`/packages/${pkg.id}`}
                        className="group/btn relative overflow-hidden bg-slate-900 text-white p-4 rounded-2xl hover:bg-primary transition-all duration-500"
                    >
                        <div className={`relative z-10 flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span className={`max-w-0 overflow-hidden group-hover/btn:max-w-xs transition-all duration-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${language === 'ar' ? 'group-hover/btn:ml-2' : 'group-hover/btn:mr-2'}`}>
                                {t('packages.reserve')}
                            </span>
                            <ArrowRight size={20} className={`transform group-hover/btn:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
