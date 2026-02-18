import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { Quote, Star, User } from 'lucide-react';

const TestimonialsSection = () => {
    const { t, language } = useLanguage();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await api.get('/testimonials');
                setTestimonials(res.data);
            } catch (error) {
                console.error("Error fetching testimonials", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    if (!loading && testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>

            <div className="container mx-auto px-4 relative">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                            <Quote size={32} fill="currentColor" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 leading-tight mb-6">
                        {t('reviews.title')}
                    </h2>
                    <p className="text-lg text-slate-500 font-light leading-relaxed">
                        {t('reviews.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map(n => (
                            <div key={n} className="h-64 bg-slate-50 rounded-[2.5rem] animate-pulse"></div>
                        ))
                    ) : (
                        testimonials.map((testimony, index) => (
                            <div
                                key={testimony.id}
                                className={`p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col ${index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                                    }`}
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimony.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-secondary text-secondary" />
                                    ))}
                                </div>
                                <p className="text-slate-600 font-light italic leading-relaxed text-lg mb-8 flex-1">
                                    "{testimony.content}"
                                </p>
                                <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 ring-4 ring-white shadow-lg">
                                        {testimony.imageUrl ? (
                                            <img src={testimony.imageUrl} alt={testimony.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                                                <User size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                                        <div className="font-serif font-black text-slate-900 uppercase tracking-wider text-sm">{testimony.name}</div>
                                        <div className="text-[10px] text-primary font-black uppercase tracking-widest mt-0.5">Verified Jamaah</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
