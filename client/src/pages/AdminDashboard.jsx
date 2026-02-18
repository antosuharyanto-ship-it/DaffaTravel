import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { LayoutGrid, Package as PackageIcon, Users, Image as ImageIcon, Plus, Trash2, Edit2, AlertCircle, X, Check, TrendingUp, HandCoins, Sparkles, FileText, MessageSquare, ShieldCheck, Star } from 'lucide-react';

const AdminDashboard = () => {
    const { t, language } = useLanguage();
    const [stats, setStats] = useState({ packages: 0, bookings: 0, users: 0, totalSales: 0, agents: 0 });
    const [activeTab, setActiveTab] = useState('overview');
    const [packages, setPackages] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [articles, setArticles] = useState([]);
    const [leads, setLeads] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newPackage, setNewPackage] = useState({ title: '', description: '', price: '', duration: '', type: 'UMRAH', availableSlots: 20, startDate: '', endDate: '', image: '', flyerImage: '', hotelStars: 3 });
    const [newGalleryItem, setNewGalleryItem] = useState({ imageUrl: '', caption: '', category: 'UMRAH' });
    const [newTestimony, setNewTestimony] = useState({ name: '', content: '', rating: 5, imageUrl: '' });
    const [newArticle, setNewArticle] = useState({ title: '', content: '', imageUrl: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [pkgsRes, bookingsRes] = await Promise.all([
                api.get('/packages'),
                api.get('/transactions')
            ]);
            setPackages(pkgsRes.data);
            setBookings(bookingsRes.data);

            // Fetch secondary resources independently to prevent one failure from blocking all
            const fetchSecondary = async (endpoint, setter) => {
                try {
                    const res = await api.get(endpoint);
                    setter(res.data);
                    return res.data;
                } catch (err) {
                    console.warn(`Failed to fetch ${endpoint}`, err);
                    return [];
                }
            };

            const [galleryData, testimonialsData, articlesData, leadsData, usersData] = await Promise.all([
                fetchSecondary('/gallery', setGallery),
                fetchSecondary('/testimonials', setTestimonials),
                fetchSecondary('/articles', setArticles),
                fetchSecondary('/leads', setLeads),
                fetchSecondary('/auth/users', setUsers)
            ]);

            setStats({
                packages: pkgsRes.data.length,
                bookings: bookingsRes.data.length,
                users: usersData.length || new Set(bookingsRes.data.map(b => b.userId)).size
            });
        } catch (error) {
            console.error("Critical error fetching admin data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this package?')) return;
        try {
            await api.delete(`/packages/${id}`);
            setPackages(packages.filter(p => p.id !== id));
            setStats(prev => ({ ...prev, packages: prev.packages - 1 }));
        } catch (error) {
            alert('Delete failed');
        }
    };

    const handleAddPackage = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...newPackage,
                price: parseFloat(newPackage.price),
                availableSlots: parseInt(newPackage.availableSlots),
                startDate: new Date(newPackage.startDate),
                endDate: new Date(newPackage.endDate)
            };

            if (editingId) {
                const res = await api.put(`/packages/${editingId}`, payload);
                setPackages(packages.map(p => p.id === editingId ? res.data : p));
                setEditingId(null);
            } else {
                const res = await api.post('/packages', payload);
                setPackages([...packages, res.data]);
                setStats(prev => ({ ...prev, packages: prev.packages + 1 }));
            }

            setShowAddForm(false);
            setNewPackage({ title: '', description: '', price: '', duration: '', type: 'UMRAH', availableSlots: 20, startDate: '', endDate: '', image: '', flyerImage: '', hotelStars: 3 });
        } catch (error) {
            alert('Operation failed: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleEdit = (pkg) => {
        setNewPackage({
            ...pkg,
            startDate: pkg.startDate ? new Date(pkg.startDate).toISOString().split('T')[0] : '',
            endDate: pkg.endDate ? new Date(pkg.endDate).toISOString().split('T')[0] : '',
            price: pkg.price.toString()
        });
        setEditingId(pkg.id);
        setShowAddForm(true);
    };

    const handleAddGalleryItem = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/gallery', newGalleryItem);
            setGallery([...gallery, res.data]);
            setShowAddForm(false);
            setNewGalleryItem({ imageUrl: '', caption: '', category: 'UMRAH' });
        } catch (error) {
            alert('Gallery addition failed');
        }
    };

    const handleDeleteGalleryItem = async (id) => {
        if (!window.confirm('Delete this image?')) return;
        try {
            await api.delete(`/gallery/${id}`);
            setGallery(gallery.filter(item => item.id !== id));
        } catch (error) {
            alert('Delete failed');
        }
    };

    const handleAddTestimony = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/testimonials', newTestimony);
            setTestimonials([...testimonials, res.data]);
            setShowAddForm(false);
            setNewTestimony({ name: '', content: '', rating: 5, imageUrl: '' });
        } catch (error) {
            alert('Testimony addition failed');
        }
    };

    const handleDeleteTestimony = async (id) => {
        if (!window.confirm('Delete this testimony?')) return;
        try {
            await api.delete(`/testimonials/${id}`);
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (error) {
            alert('Delete failed');
        }
    };

    const handleAddArticle = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/articles', newArticle);
            setArticles([...articles, res.data]);
            setShowAddForm(false);
            setNewArticle({ title: '', content: '', imageUrl: '' });
        } catch (error) {
            alert('Article addition failed');
        }
    };

    const handleDeleteArticle = async (id) => {
        if (!window.confirm('Delete this article?')) return;
        try {
            await api.delete(`/articles/${id}`);
            setArticles(articles.filter(a => a.id !== id));
        } catch (error) {
            alert('Delete failed');
        }
    };

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            await api.put(`/auth/users/${userId}`, { role: newRole });
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            alert('Role update failed');
        }
    };

    const handleAdminResetPassword = async (userId) => {
        const newPassword = window.prompt('Enter new password for this user:');
        if (!newPassword || newPassword.length < 6) {
            if (newPassword) alert('Password must be at least 6 characters');
            return;
        }

        try {
            await api.put(`/auth/users/${userId}/reset-password`, { password: newPassword });
            alert('Password reset successfully');
        } catch (error) {
            alert('Password reset failed');
        }
    };

    const handleUpdateLeadStatus = async (leadId, newStatus) => {
        try {
            await api.put(`/leads/${leadId}`, { status: newStatus });
            setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        } catch (error) {
            alert('Lead status update failed');
        }
    };

    const handleDeleteLead = async (id) => {
        if (!window.confirm('Delete this lead?')) return;
        try {
            await api.delete(`/leads/${id}`);
            setLeads(leads.filter(l => l.id !== id));
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div className={`min-h-screen bg-slate-50 pt-32 pb-20 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="container mx-auto px-4">
                <div className={`flex flex-col md:flex-row gap-8 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                    {/* Sidebar */}
                    <aside className="md:w-64 space-y-2">
                        <div className="px-4 mb-8">
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-1">Admin CMS</h2>
                            <div className="h-1 w-8 bg-secondary rounded-full"></div>
                        </div>
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                            style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                        >
                            <LayoutGrid size={20} className={language === 'ar' ? 'ml-3' : 'mr-3'} />
                            <span className="font-bold text-[13px] uppercase tracking-wider">{t('admin.overview')}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('packages')}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === 'packages' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                            style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                        >
                            <PackageIcon size={20} className={language === 'ar' ? 'ml-3' : 'mr-3'} />
                            <span className="font-bold text-[13px] uppercase tracking-wider">{t('admin.packages')}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === 'bookings' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                            style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                        >
                            <Users size={20} className={language === 'ar' ? 'ml-3' : 'mr-3'} />
                            <span className="font-bold text-[13px] uppercase tracking-wider">{t('admin.bookings')}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === 'gallery' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                            style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                        >
                            <ImageIcon size={20} className={language === 'ar' ? 'ml-3' : 'mr-3'} />
                            <span className="font-bold text-[13px] uppercase tracking-wider">Gallery</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('testimonials')}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === 'testimonials' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                            style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                        >
                            <MessageSquare size={20} className={language === 'ar' ? 'ml-3' : 'mr-3'} />
                            <span className="font-bold text-[13px] uppercase tracking-wider">Testimonials</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('articles')}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === 'articles' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                            style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                        >
                            <FileText size={20} className={language === 'ar' ? 'ml-3' : 'mr-3'} />
                            <span className="font-bold text-[13px] uppercase tracking-wider">Articles</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === 'leads' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                            style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                        >
                            <TrendingUp size={20} className={language === 'ar' ? 'ml-3' : 'mr-3'} />
                            <span className="font-bold text-[13px] uppercase tracking-wider">Leads / Booked</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === 'users' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                            style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                        >
                            <ShieldCheck size={20} className={language === 'ar' ? 'ml-3' : 'mr-3'} />
                            <span className="font-bold text-[13px] uppercase tracking-wider">User Roles</span>
                        </button>
                    </aside>

                    <main className="flex-1 overflow-hidden">
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="flex items-center justify-between mb-8">
                                    <h1 className="text-4xl font-serif font-black text-slate-900">{t('admin.overview')}</h1>
                                    <div className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-100 flex items-center">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                                        System Online
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="glass-card !bg-white p-8 border-slate-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 text-emerald-500 opacity-10 transform group-hover:scale-110 transition-transform">
                                            <TrendingUp size={80} />
                                        </div>
                                        <div className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">{t('admin.stats.totalRevenue')}</div>
                                        <div className="text-3xl font-serif font-black text-slate-900">
                                            <span className="text-sm opacity-50 mr-1 font-sans">Rp</span>
                                            {new Intl.NumberFormat('id-ID').format(stats.totalSales || 0)}
                                        </div>
                                    </div>
                                    <div className="glass-card !bg-white p-8 border-slate-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 text-secondary opacity-10 transform group-hover:scale-110 transition-transform">
                                            <HandCoins size={80} />
                                        </div>
                                        <div className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">{t('admin.stats.activeBookings')}</div>
                                        <div className="text-3xl font-serif font-black text-slate-900">{stats.bookings || 0}</div>
                                    </div>
                                    <div className="glass-card !bg-white p-8 border-slate-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 text-primary opacity-10 transform group-hover:scale-110 transition-transform">
                                            <PackageIcon size={80} />
                                        </div>
                                        <div className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">{t('admin.stats.totalPackages')}</div>
                                        <div className="text-3xl font-serif font-black text-slate-900">{stats.packages}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'packages' && (
                            <div className="space-y-6">
                                <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <h1 className="text-3xl font-serif font-black">{t('admin.packages')}</h1>
                                    <button
                                        onClick={() => {
                                            if (showAddForm) {
                                                setEditingId(null);
                                                setNewPackage({ title: '', description: '', price: '', duration: '', type: 'UMRAH', availableSlots: 20, startDate: '', endDate: '', image: '', flyerImage: '', hotelStars: 3 });
                                            }
                                            setShowAddForm(!showAddForm);
                                        }}
                                        className="bg-slate-900 text-white !py-2.5 !px-6 rounded-2xl flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                                        style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}
                                    >
                                        {showAddForm ? <X size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} /> : <Plus size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} />}
                                        <span>{showAddForm ? t('admin.form.cancel') : t('admin.form.addNew')}</span>
                                    </button>
                                </div>

                                {showAddForm && (
                                    <div className="glass-card !bg-white p-10 border-slate-100 shadow-2xl animate-slide-up mb-12 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>
                                        <div className={`flex items-center justify-between mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                            <div>
                                                <h2 className="text-2xl font-black font-serif text-slate-900">{editingId ? t('admin.form.edit') : t('admin.form.create')}</h2>
                                                <p className="text-slate-400 text-xs font-medium tracking-wide mt-1">Fill in the details to publish a new travel package.</p>
                                            </div>
                                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                                {editingId ? <Edit2 size={24} /> : <Plus size={24} />}
                                            </div>
                                        </div>

                                        <form onSubmit={handleAddPackage} className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                            {/* Basic Info Section */}
                                            <div className="md:col-span-4">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.form.title')}</label>
                                                <input required type="text" placeholder="e.g. Premium Umrah February" className="w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-medium transition-all" value={newPackage.title} onChange={e => setNewPackage({ ...newPackage, title: e.target.value })} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.table.category')}</label>
                                                <div className="relative">
                                                    <select className="w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-medium appearance-none transition-all" value={newPackage.type} onChange={e => setNewPackage({ ...newPackage, type: e.target.value })}>
                                                        <option value="UMRAH">🕋 Umrah</option>
                                                        <option value="HAJJ">🌙 Hajj</option>
                                                        <option value="HOLIDAY">🌍 Holiday</option>
                                                        <option value="OTHER">✨ Other</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <LayoutGrid size={16} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Details Section */}
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Price (Rp)</label>
                                                <div className="relative">
                                                    <input required type="number" placeholder="0" className={`w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-black text-xl transition-all ${language === 'ar' ? 'pr-12' : 'pl-12'}`} value={newPackage.price} onChange={e => setNewPackage({ ...newPackage, price: e.target.value })} />
                                                    <span className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs`}>Rp</span>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Duration (e.g. 9 Days)</label>
                                                <input required type="text" placeholder="9 Days" className="w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-medium transition-all" value={newPackage.duration} onChange={e => setNewPackage({ ...newPackage, duration: e.target.value })} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Hotel Stars</label>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <button key={star} type="button" onClick={() => setNewPackage({ ...newPackage, hotelStars: star })} className={`flex-1 py-3 rounded-xl border transition-all font-black text-sm ${newPackage.hotelStars === star ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' : 'bg-white border-slate-100 text-slate-400 hover:border-secondary/30'}`}>
                                                            {star}★
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Dates Section */}
                                            <div className="md:col-span-3">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.form.startDate')}</label>
                                                <input required type="date" className="w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-medium transition-all" value={newPackage.startDate} onChange={e => setNewPackage({ ...newPackage, startDate: e.target.value })} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.form.endDate')}</label>
                                                <input required type="date" className="w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-medium transition-all" value={newPackage.endDate} onChange={e => setNewPackage({ ...newPackage, endDate: e.target.value })} />
                                            </div>

                                            {/* Images Section */}
                                            <div className="md:col-span-3">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Main Image ID/URL</label>
                                                <div className="relative">
                                                    <input type="text" placeholder="https://images.unsplash.com/..." className="w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-medium transition-all" value={newPackage.image} onChange={e => setNewPackage({ ...newPackage, image: e.target.value })} />
                                                    <ImageIcon size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                </div>
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Flyer Image URL (Promotion)</label>
                                                <div className="relative">
                                                    <input type="text" placeholder="https://..." className="w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-medium transition-all" value={newPackage.flyerImage} onChange={e => setNewPackage({ ...newPackage, flyerImage: e.target.value })} />
                                                    <Sparkles size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                </div>
                                            </div>

                                            {/* Description Section */}
                                            <div className="md:col-span-6">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('packages.description')}</label>
                                                <textarea required rows="4" placeholder="Describe the journey, facilities, and inclusions..." className="w-full p-4 rounded-2xl border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none bg-white font-medium transition-all resize-none" value={newPackage.description} onChange={e => setNewPackage({ ...newPackage, description: e.target.value })}></textarea>
                                            </div>

                                            {/* Actions */}
                                            <div className="md:col-span-6 flex items-center gap-4 mt-4">
                                                <button type="submit" className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                                                    {editingId ? <Check size={20} /> : <Plus size={20} />}
                                                    <span>{editingId ? t('admin.form.update') : t('admin.form.createBtn')}</span>
                                                </button>
                                                <button type="button" onClick={() => setShowAddForm(false)} className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                                                    {t('admin.form.cancel')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                <div className="overflow-x-auto border-0 rounded-3xl bg-white shadow-xl relative z-10">
                                    <table className={`w-full text-left ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                        <thead className="bg-slate-900 border-0">
                                            <tr style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}>
                                                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">{t('admin.table.package')}</th>
                                                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">{t('admin.table.category')}</th>
                                                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">{t('admin.table.price')}</th>
                                                <th className={`p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 ${language === 'ar' ? 'text-left' : 'text-right'}`}>{t('admin.table.actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {packages.map(pkg => (
                                                <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="p-6">
                                                        <div className="font-serif font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{pkg.title}</div>
                                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{pkg.duration}</div>
                                                    </td>
                                                    <td className="p-6">
                                                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black tracking-widest uppercase text-slate-500">
                                                            {pkg.type}
                                                        </span>
                                                    </td>
                                                    <td className="p-6 font-black text-primary text-xl">
                                                        <span className="text-xs opacity-50 mr-1 font-sans">Rp</span>
                                                        {new Intl.NumberFormat('id-ID').format(pkg.price)}
                                                    </td>
                                                    <td className={`p-6 space-x-2 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                                                        <button
                                                            onClick={() => handleEdit(pkg)}
                                                            className="p-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(pkg.id)}
                                                            className="p-3 text-slate-400 hover:text-white hover:bg-red-500 rounded-xl transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {packages.length === 0 && !loading && (
                                                <tr>
                                                    <td colSpan="4" className="p-24 text-center text-slate-400 font-serif italic text-2xl opacity-40">
                                                        {t('admin.table.noData')}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'bookings' && (
                            <div className="space-y-6 animate-fade-in">
                                <h1 className="text-4xl font-serif font-black text-slate-900">{t('admin.bookings')}</h1>
                                <div className="overflow-x-auto border-0 rounded-3xl bg-white shadow-xl">
                                    <table className={`w-full text-left ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                        <thead className="bg-slate-900">
                                            <tr>
                                                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">{t('admin.table.user')}</th>
                                                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">{t('admin.table.package')}</th>
                                                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">{t('admin.table.date')}</th>
                                                <th className={`p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 ${language === 'ar' ? 'text-left' : 'text-right'}`}>{t('admin.table.status')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {bookings.map(booking => (
                                                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-6">
                                                        <div className="font-bold text-slate-900">{booking.user?.name}</div>
                                                        <div className="text-xs text-slate-400">{booking.user?.email}</div>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="text-sm font-black text-slate-700">{booking.package?.title}</div>
                                                        <div className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{booking.package?.type}</div>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="text-sm font-medium text-slate-600">
                                                            {new Date(booking.createdAt).toLocaleDateString()}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest">
                                                            {new Date(booking.createdAt).toLocaleTimeString()}
                                                        </div>
                                                    </td>
                                                    <td className={`p-6 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' : booking.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {bookings.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="p-24 text-center text-slate-400 font-serif italic text-2xl opacity-40">
                                                        {t('admin.table.noData')}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'gallery' && (
                            <div className="space-y-6">
                                <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <h1 className="text-3xl font-serif font-black">Gallery Management</h1>
                                    <button
                                        onClick={() => setShowAddForm(!showAddForm)}
                                        className="bg-slate-900 text-white !py-2.5 !px-6 rounded-2xl flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        {showAddForm ? <X size={16} /> : <Plus size={16} />}
                                        <span>{showAddForm ? 'Cancel' : 'Add Image'}</span>
                                    </button>
                                </div>

                                {showAddForm && (
                                    <div className="glass-card !bg-white p-8 border-slate-100 shadow-2xl animate-slide-up mb-8">
                                        <form onSubmit={handleAddGalleryItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Image URL</label>
                                                <input required type="text" placeholder="https://..." className="w-full p-4 rounded-2xl border border-slate-100 outline-none" value={newGalleryItem.imageUrl} onChange={e => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Category</label>
                                                <select className="w-full p-4 rounded-2xl border border-slate-100 outline-none bg-white" value={newGalleryItem.category} onChange={e => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}>
                                                    <option value="UMRAH">Umrah</option>
                                                    <option value="HAJJ">Hajj</option>
                                                    <option value="HOLIDAY">Holiday</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Caption</label>
                                                <input type="text" placeholder="Image description..." className="w-full p-4 rounded-2xl border border-slate-100 outline-none" value={newGalleryItem.caption} onChange={e => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })} />
                                            </div>
                                            <button type="submit" className="md:col-span-2 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest">Add to Gallery</button>
                                        </form>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {gallery.map(item => (
                                        <div key={item.id} className="group relative aspect-square rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                                            <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                <p className="text-white text-[10px] font-bold uppercase truncate">{item.caption}</p>
                                                <button onClick={() => handleDeleteGalleryItem(item.id)} className="mt-2 text-red-400 hover:text-red-300 text-[10px] font-black">DELETE</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'testimonials' && (
                            <div className="space-y-6">
                                <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <h1 className="text-3xl font-serif font-black">Jamaah Testimonials</h1>
                                    <button
                                        onClick={() => setShowAddForm(!showAddForm)}
                                        className="bg-slate-900 text-white !py-2.5 !px-6 rounded-2xl flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        {showAddForm ? <X size={16} /> : <Plus size={16} />}
                                        <span>{showAddForm ? 'Cancel' : 'Add Testimony'}</span>
                                    </button>
                                </div>

                                {showAddForm && (
                                    <div className="glass-card !bg-white p-8 border-slate-100 shadow-2xl animate-slide-up mb-8">
                                        <form onSubmit={handleAddTestimony} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Jamaah Name</label>
                                                <input required type="text" placeholder="Full Name" className="w-full p-4 rounded-2xl border border-slate-100 outline-none" value={newTestimony.name} onChange={e => setNewTestimony({ ...newTestimony, name: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Rating</label>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <button key={star} type="button" onClick={() => setNewTestimony({ ...newTestimony, rating: star })} className={`flex-1 py-3 rounded-xl border ${newTestimony.rating === star ? 'bg-secondary text-white border-secondary' : 'bg-white border-slate-100'}`}>
                                                            {star}★
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Testimony Content</label>
                                                <textarea required rows="3" className="w-full p-4 rounded-2xl border border-slate-100 outline-none resize-none" value={newTestimony.content} onChange={e => setNewTestimony({ ...newTestimony, content: e.target.value })}></textarea>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Image URL (Optional)</label>
                                                <input type="text" placeholder="https://..." className="w-full p-4 rounded-2xl border border-slate-100 outline-none" value={newTestimony.imageUrl} onChange={e => setNewTestimony({ ...newTestimony, imageUrl: e.target.value })} />
                                            </div>
                                            <button type="submit" className="md:col-span-2 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest">Post Testimony</button>
                                        </form>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {testimonials.map(item => (
                                        <div key={item.id} className="glass-card !bg-white p-6 border-slate-100 relative group">
                                            <div className="flex items-center gap-4 mb-4">
                                                {item.imageUrl ? (
                                                    <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">{item.name[0]}</div>
                                                )}
                                                <div>
                                                    <div className="font-serif font-black text-slate-900">{item.name}</div>
                                                    <div className="flex text-amber-400">
                                                        {[...Array(item.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm leading-relaxed italic">"{item.content}"</p>
                                            <button onClick={() => handleDeleteTestimony(item.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeTab === 'articles' && (
                            <div className="space-y-6">
                                <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <h1 className="text-3xl font-serif font-black">Articles / Blog</h1>
                                    <button
                                        onClick={() => setShowAddForm(!showAddForm)}
                                        className="bg-slate-900 text-white !py-2.5 !px-6 rounded-2xl flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        {showAddForm ? <X size={16} /> : <Plus size={16} />}
                                        <span>{showAddForm ? 'Cancel' : 'New Article'}</span>
                                    </button>
                                </div>

                                {showAddForm && (
                                    <div className="glass-card !bg-white p-8 border-slate-100 shadow-2xl animate-slide-up mb-8">
                                        <form onSubmit={handleAddArticle} className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Title</label>
                                                <input required type="text" className="w-full p-4 rounded-2xl border border-slate-100 outline-none" value={newArticle.title} onChange={e => setNewArticle({ ...newArticle, title: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Featured Image URL</label>
                                                <input type="text" className="w-full p-4 rounded-2xl border border-slate-100 outline-none" value={newArticle.imageUrl} onChange={e => setNewArticle({ ...newArticle, imageUrl: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Content</label>
                                                <textarea required rows="10" className="w-full p-4 rounded-2xl border border-slate-100 outline-none resize-none font-mono text-sm" value={newArticle.content} onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}></textarea>
                                            </div>
                                            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest">Publish Article</button>
                                        </form>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {articles.map(item => (
                                        <div key={item.id} className="glass-card !bg-white p-6 border-slate-100 flex items-center gap-6 group">
                                            {item.imageUrl && <img src={item.imageUrl} alt="" className="w-24 h-24 rounded-2xl object-cover" />}
                                            <div className="flex-1">
                                                <h3 className="font-serif font-black text-xl text-slate-900">{item.title}</h3>
                                                <p className="text-slate-400 text-xs mt-1">Published on {new Date(item.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <button onClick={() => handleDeleteArticle(item.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="space-y-6">
                                <h1 className="text-3xl font-serif font-black">User Roles & Management</h1>
                                <div className="overflow-x-auto rounded-3xl bg-white shadow-xl border border-slate-100">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <tr>
                                                <th className="p-6">User</th>
                                                <th className="p-6">Current Role</th>
                                                <th className="p-6">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {users.map(user => (
                                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-6">
                                                        <div className="font-bold text-slate-900">{user.name}</div>
                                                        <div className="text-xs text-slate-400">{user.email}</div>
                                                    </td>
                                                    <td className="p-6">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600' : user.role === 'AGENT' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="flex items-center gap-2">
                                                            <select
                                                                value={user.role}
                                                                onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                                                className="p-2 rounded-xl border border-slate-100 text-xs font-bold outline-none focus:border-secondary bg-white"
                                                            >
                                                                <option value="CUSTOMER">Customer</option>
                                                                <option value="AGENT">Agent</option>
                                                                <option value="ADMIN">Admin</option>
                                                            </select>
                                                            <button
                                                                onClick={() => handleAdminResetPassword(user.id)}
                                                                className="p-2 text-slate-300 hover:text-secondary transition-colors"
                                                                title="Reset Password"
                                                            >
                                                                <ShieldCheck size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {users.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="p-20 text-center text-slate-400 font-serif italic text-xl">
                                                        No users found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'leads' && (
                            <div className="space-y-6">
                                <h1 className="text-3xl font-serif font-black">Booked Interests / Leads</h1>
                                <div className="overflow-x-auto rounded-3xl bg-white shadow-xl border border-slate-100">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <tr>
                                                <th className="p-6">Lead / Contact</th>
                                                <th className="p-6">Package / Date</th>
                                                <th className="p-6">Status</th>
                                                <th className="p-6">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {leads.map(lead => (
                                                <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="p-6">
                                                        <div className="font-bold text-slate-900">{lead.name}</div>
                                                        <div className="flex flex-col text-[10px] text-slate-500 mt-1 space-y-0.5">
                                                            <span className="flex items-center"><Phone size={10} className="mr-1" /> {lead.phone}</span>
                                                            <span className="flex items-center"><Mail size={10} className="mr-1" /> {lead.email}</span>
                                                            <span className="flex items-center font-bold text-green-600"><MessageCircle size={10} className="mr-1" /> {lead.whatsapp}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="text-sm font-black text-slate-700">{lead.package?.title || 'General Interest'}</div>
                                                        <div className="text-xs text-slate-400 mt-1 flex items-center">
                                                            <Calendar size={12} className="mr-1" /> {new Date(lead.preferredDate).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="p-6">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${lead.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : lead.status === 'FOLLOWED_UP' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'}`}>
                                                            {lead.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="flex items-center gap-3">
                                                            <select
                                                                value={lead.status}
                                                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                                                                className="p-2 rounded-xl border border-slate-100 text-xs font-bold outline-none focus:border-secondary bg-white"
                                                            >
                                                                <option value="PENDING">Pending</option>
                                                                <option value="FOLLOWED_UP">Followed Up</option>
                                                                <option value="COMPLETED">Completed</option>
                                                            </select>
                                                            <button onClick={() => handleDeleteLead(lead.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {leads.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="p-20 text-center text-slate-400 font-serif italic text-xl">
                                                        No interests recorded yet...
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
