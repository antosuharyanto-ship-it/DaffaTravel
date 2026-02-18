import React from 'react';
import heroBg from '../assets/hero_bg.jpg';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

const Hero = () => {
    const { t, language } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat transition-transform duration-1000 transform scale-105 bg-slate-950"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-900/95"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-40 md:pt-48">
                <div className="max-w-4xl">
                    <div className={`space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <h2 className="text-secondary font-black tracking-[0.3em] uppercase text-[10px] md:text-sm animate-fade-in flex items-center gap-4">
                            <span>{t('hero.subtitle')}</span>
                            <span className="w-8 h-[1px] bg-secondary/30"></span>
                        </h2>

                        <h1 className="text-5xl md:text-8xl font-serif text-white leading-[1.1] animate-slide-up">
                            {t('hero.title')} <br />
                            <span className="text-secondary italic block mt-2">{t('hero.titleAccent')}</span>
                        </h1>

                        <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed font-light animate-fade-in delay-300">
                            {t('hero.description')}
                        </p>
                    </div>
                    {/* Search Bar / CTA Area */}
                    <div className="mt-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <button className="bg-secondary hover:bg-amber-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-secondary/30 active:scale-95 flex items-center group">
                            <span>{t('hero.cta')}</span>
                            <ArrowRight size={18} className={`ml-2 group-hover:translate-x-2 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Search Box - Premium Style (Now in flow to prevent overlap) */}
                    <div className="mt-16 w-full animate-slide-up delay-700">
                        <div className="glass-card !bg-white/10 backdrop-blur-2xl border-white/20 p-2 md:p-3 rounded-3xl flex flex-col lg:flex-row items-stretch gap-2 transition-all hover:border-white/40">
                            <div className={`flex-1 flex items-center px-6 py-4 lg:py-0 border-b lg:border-b-0 ${language === 'ar' ? 'lg:border-l' : 'lg:border-r'} border-white/10 group cursor-pointer hover:bg-white/5 transition-colors rounded-2xl lg:rounded-none`}>
                                <MapPin className="text-secondary mr-4" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t('hero.searchPlaceholder')}</span>
                                    <span className="text-white font-serif font-bold text-lg">Makkah, Madinah</span>
                                </div>
                            </div>
                            <div className={`flex-1 flex items-center px-6 py-4 lg:py-0 border-b lg:border-b-0 ${language === 'ar' ? 'lg:border-l' : 'lg:border-r'} border-white/10 group cursor-pointer hover:bg-white/5 transition-colors rounded-2xl lg:rounded-none`}>
                                <Compass className="text-secondary mr-4" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t('hero.categoryPlaceholder')}</span>
                                    <span className="text-white font-serif font-bold text-lg">{t('categories.umrah.title')}</span>
                                </div>
                            </div>
                            <button className="bg-white text-slate-900 hover:bg-secondary hover:text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95">
                                {t('hero.searchButton')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center text-white opacity-50">
                <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
                <div className="w-px h-12 bg-white"></div>
            </div>
        </section>
    );
};

export default Hero;
