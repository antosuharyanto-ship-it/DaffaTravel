import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
    const { t, language } = useLanguage();

    const contactMethods = [
        {
            icon: <Phone size={24} className="text-secondary" />,
            title: 'Call Us Directly',
            desc: 'Available Mon-Fri 08:00 - 17:00',
            value: '0816 1616 372',
            link: 'tel:+628161616372'
        },
        {
            icon: <Mail size={24} className="text-secondary" />,
            title: 'Email Us',
            desc: 'We usually respond within 24h',
            value: 'daffatourstravel3@gmail.com',
            link: 'mailto:daffatourstravel3@gmail.com'
        },
        {
            icon: <MapPin size={24} className="text-secondary" />,
            title: 'Visit Our Office',
            desc: 'Sudirman Park Tower B unit B 31 CJ',
            value: 'Tanah Abang, Jakarta Pusat',
            link: 'https://maps.google.com'
        }
    ];

    return (
        <div className="pt-32 pb-20">
            <section className="container mx-auto px-4 mb-24">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4 animate-slide-up">
                    <h4 className="text-secondary font-black tracking-[0.3em] uppercase text-xs">
                        {t('contact.tagline') || 'GET IN TOUCH'}
                    </h4>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-tight">
                        {t('contact.title') || 'Ready to Start'} <br />
                        <span className="text-secondary italic">{t('contact.titleAccent') || 'Your Journey?'}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(Array.isArray(t('offices.list')) ? t('offices.list') : []).map((office, i) => (
                        <div
                            key={i}
                            className="glass-card !bg-white p-10 border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                                    <MapPin size={24} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{office.name}</span>
                            </div>
                            <h3 className="text-xl font-serif font-black text-slate-900 mb-2">{office.location}</h3>
                            <p className="text-slate-500 text-xs font-light leading-relaxed mb-6 flex-grow">{office.address}</p>

                            {office.phone && (
                                <div className="pt-4 border-t border-slate-50 mt-auto">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                                    <p className="text-primary font-bold">{office.phone}</p>
                                </div>
                            )}
                            {office.contact && (
                                <div className="pt-4 border-t border-slate-50 mt-auto">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Contact</p>
                                    <p className="text-primary font-bold text-xs">{office.contact}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4">
                <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px]">
                    <div className="lg:w-1/2 p-12 md:p-20 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-serif font-black text-white">Send us a Message</h2>
                            <p className="text-slate-400 font-light">Have specific questions about a package or need a custom itinerary? Fill out the form and our consultants will get back to you shortly.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-secondary transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-secondary transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subject</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-secondary transition-colors" placeholder="Umrah Package Inquiry" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message</label>
                                <textarea rows="5" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-secondary transition-colors resize-none" placeholder="Tell us more about your needs..."></textarea>
                            </div>
                            <button className="w-full bg-secondary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-3 active:scale-95">
                                <span>Submit Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>

                    <div className="lg:w-1/2 bg-slate-800 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 grayscale brightness-50">
                            <img
                                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Daffa Office"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative z-10 text-center p-12">
                            <div className="inline-block p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl mb-8">
                                <Clock size={40} className="text-secondary" />
                            </div>
                            <h3 className="text-3xl font-serif font-black text-white mb-4">Office Hours</h3>
                            <div className="space-y-2 text-slate-300">
                                <p>Monday — Friday: 08:00 AM - 05:00 PM</p>
                                <p>Saturday: 09:00 AM - 01:00 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
