import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, Users, Heart } from 'lucide-react';

const AboutPage = () => {
    const { t, language } = useLanguage();

    const stats = [
        { icon: <Users size={24} />, label: 'Happy Pilgrims', value: '10,000+' },
        { icon: <Award size={24} />, label: 'Years Experience', value: '15+' },
        { icon: <ShieldCheck size={24} />, label: 'Offical Partner', value: 'Maksur' },
        { icon: <Heart size={24} />, label: 'Service Rating', value: '4.9/5' }
    ];

    return (
        <div className="pt-32 pb-20 overflow-hidden">
            {/* Mission Section */}
            <section className="container mx-auto px-4 mb-24">
                <div className={`flex flex-col lg:flex-row items-center gap-16 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="lg:w-1/2 space-y-8 animate-slide-up">
                        <div className="space-y-4">
                            <h4 className="text-secondary font-black tracking-[0.3em] uppercase text-xs md:text-sm">
                                {t('about.tagline') || 'SINCE 2009'}
                            </h4>
                            <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-[1.1]">
                                {t('about.aboutTitle') || 'Introduction'} <br />
                                <span className="text-secondary italic">{t('about.titleAccent') || 'Sacred Journey'}</span>
                            </h1>
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed font-light max-w-2xl">
                            {t('about.description')}
                        </p>

                        <div className="grid grid-cols-2 gap-8 pt-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="text-secondary">{stat.icon}</div>
                                    <div className="text-2xl font-serif font-black text-slate-900">{stat.value}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative animate-fade-in delay-300">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Makkah"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </section>

            {/* Legal Section */}
            <section className="container mx-auto px-4 mb-24">
                <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 shadow-inner">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px flex-1 bg-slate-200"></div>
                            <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 uppercase tracking-tight">
                                {t('about.legalTitle') || 'Legal & Licensing'}
                            </h2>
                            <div className="h-px flex-1 bg-slate-200"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {(Array.isArray(t('about.legalItems')) ? t('about.legalItems') : [
                                'Akta Pendirian No. 20.- Tanggal 22 Februari 2013',
                                'Tanda Daftar Usaha Biro Perjalanan Wisata',
                                'Izin PPIU No. 02780100619940003 Tahun 2023',
                                'NPWP No. 71.519.960.0-029.000'
                            ]).map((item, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 group-hover:scale-150 transition-transform"></div>
                                    <p className="text-slate-600 text-sm font-light leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-slate-900 py-24 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-serif font-black">{t('about.valuesTitle') || 'Our Core Principles'}</h2>
                        <p className="text-slate-400 font-light">{t('about.valuesSubtitle') || 'Everything we do is guided by a commitment to Islamic values and professional excellence.'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Trust & Integrity', desc: 'Full transparency in pricing and facilities, ensuring you get exactly what was promised for your sacred journey.' },
                            { title: 'Spirit of Service', desc: 'Our team is trained to serve with patience, kindness, and devotion, treating every pilgrim as our special guest.' },
                            { title: 'Excellence', desc: 'From hotel selections to flight schedules, we meticulously plan every detail for maximum comfort and serenity.' }
                        ].map((value, i) => (
                            <div key={i} className="glass-card !bg-white/5 border-white/5 p-12 hover:!bg-white/10 transition-all duration-500 group">
                                <div className="text-4xl font-serif italic text-secondary/30 mb-6 group-hover:text-secondary/60 transition-colors">0{i + 1}</div>
                                <h3 className="text-2xl font-serif font-black mb-4">{value.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
