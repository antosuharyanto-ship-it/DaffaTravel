import React from 'react';
import heroBg from '../assets/hero_bg.jpg';

const Hero = () => {
    return (
        <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
            <div className="lightning-strike animate-lightning"></div>
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat transition-transform duration-1000 transform scale-105 bg-slate-950"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90"></div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] md:text-sm animate-fade-in flex flex-col md:flex-row md:items-center gap-4">
                            <span>A Journey of Serenity & Devotion</span>
                            <span className="hidden md:block w-8 h-[1px] bg-secondary/30"></span>
                            <span className="text-secondary/80">Langkah Spiritual Menuju Ridho Ilahi</span>
                        </h2>
                        <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight animate-slide-up flex flex-col">
                            <span className="text-3xl md:text-5xl mb-4 font-normal opacity-90 font-arabic" dir="rtl">طريقك للتقرب إلى الله</span>
                            <span>A Way to Talk to <span className="text-secondary italic">Allah SWT</span></span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-100 font-light max-w-2xl leading-relaxed animate-fade-in delay-200">
                            Experience spiritual peace and holistic care. We craft every detail of your Umrah & Hajj journey so you can focus on what truly matters—your connection with the Divine.
                        </p>
                    </div>
                    {/* Search Bar / CTA Area */}
                    <div className="glass-card p-3 mt-12 max-w-3xl flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 px-6 py-2 w-full">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Destination</label>
                            <input
                                type="text"
                                placeholder="Where to go?"
                                className="bg-transparent w-full focus:outline-none text-white placeholder-slate-500 font-medium"
                            />
                        </div>
                        <div className="w-px h-10 bg-slate-100/10 hidden md:block"></div>
                        <div className="flex-1 px-6 py-2 w-full">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Category</label>
                            <select className="bg-transparent w-full focus:outline-none text-white appearance-none font-medium">
                                <option className="bg-slate-900">All Packages</option>
                                <option className="bg-slate-900">Umrah</option>
                                <option className="bg-slate-900">Hajj</option>
                                <option className="bg-slate-900">Holiday</option>
                            </select>
                        </div>
                        <button className="bg-secondary hover:bg-amber-600 text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-2xl transition-all duration-300 w-full md:w-auto">
                            Search
                        </button>
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
