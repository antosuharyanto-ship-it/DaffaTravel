import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Mail, User, Send, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const LeadForm = () => {
    const { t, language } = useLanguage();
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        preferredDate: '',
        packageId: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await api.get('/packages');
                setPackages(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error("Error fetching packages for lead form", error);
            }
        };
        fetchPackages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/leads', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', whatsapp: '', preferredDate: '', packageId: '' });
        } catch (error) {
            alert("Failed to submit interest. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="glass-card !bg-white p-12 text-center animate-fade-in shadow-2xl border-slate-100">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-serif font-black text-slate-900 mb-2">Terima Kasih!</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Ketertarikan Anda telah kami terima. Tim kami akan segera menghubungi Anda untuk informasi lebih lanjut.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-primary font-bold uppercase tracking-widest text-[10px]">Kirim lagi</button>
            </div>
        );
    }

    return (
        <section id="booked-interest" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] overflow-hidden border border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-12 bg-slate-900 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-4xl font-serif font-black mb-6 leading-tight italic text-secondary">Booked Your <br /><span className="text-white">Interest</span></h2>
                                <p className="text-slate-400 leading-relaxed mb-10 text-sm font-light">
                                    Pilih paket impian Anda, tentukan tanggal pilihan, dan biarkan tim ahli kami mengurus sisanya untuk perjalanan spiritual Anda.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Phone size={18} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fast Response</p>
                                            <p className="text-sm font-bold text-white">+62 877-6806-2507</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Mail size={18} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Inquiry</p>
                                            <p className="text-sm font-bold text-white">info@daffatour.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
                        </div>

                        <div className="p-12 bg-white">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center">
                                        <User size={12} className="mr-2" /> Nama Lengkap
                                    </label>
                                    <input required type="text" placeholder="Masukkan nama Anda" className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-slate-200 outline-none transition-all text-sm font-medium" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</label>
                                        <input required type="email" placeholder="email@gmail.com" className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-slate-200 outline-none transition-all text-sm font-medium" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp</label>
                                        <input required type="text" placeholder="08..." className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-slate-200 outline-none transition-all text-sm font-medium" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center">
                                        <Calendar size={12} className="mr-2" /> Pilih Paket
                                    </label>
                                    <select required className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-slate-200 outline-none transition-all text-sm font-bold appearance-none cursor-pointer" value={formData.packageId} onChange={e => setFormData({ ...formData, packageId: e.target.value })}>
                                        <option value="">Pilih Paket Layanan</option>
                                        {packages.map(pkg => (
                                            <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center">
                                        <Calendar size={12} className="mr-2" /> Rencana Keberangkatan
                                    </label>
                                    <input required type="date" className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-slate-200 outline-none transition-all text-sm font-bold" value={formData.preferredDate} onChange={e => setFormData({ ...formData, preferredDate: e.target.value })} />
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-primary hover:shadow-2xl hover:shadow-primary/20 transition-all disabled:opacity-50 active:scale-[0.98]">
                                    {loading ? 'Submitting...' : <><span>Submit Interest</span> <Send size={16} /></>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeadForm;
