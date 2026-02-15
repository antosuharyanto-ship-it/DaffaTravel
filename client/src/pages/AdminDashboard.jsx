import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { LayoutGrid, Package as PackageIcon, Users, Image as ImageIcon, Plus, Trash2, Edit2, AlertCircle, X, Check, TrendingUp, HandCoins } from 'lucide-react';

const AdminDashboard = () => {
    const { t, language } = useLanguage();
    const [stats, setStats] = useState({ packages: 0, bookings: 0, users: 0, totalSales: 0, agents: 0 });
    const [activeTab, setActiveTab] = useState('overview');
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newPackage, setNewPackage] = useState({
        title: '',
        description: '',
        price: '',
        duration: '',
        category: 'UMRAH',
        availableSlots: 20,
        startDate: '',
        endDate: '',
        image: '',
        flyerImage: '',
        hotelStars: 3
    });

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
            setStats({
                packages: pkgsRes.data.length,
                bookings: bookingsRes.data.length,
                users: new Set(bookingsRes.data.map(b => b.userId)).size // Unique users from bookings
            });
        } catch (error) {
            console.error("Error fetching admin data", error);
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
            setNewPackage({ title: '', description: '', price: '', duration: '', category: 'UMRAH', availableSlots: 20, startDate: '', endDate: '', image: '', flyerImage: '', hotelStars: 3 });
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
                                                setNewPackage({ title: '', description: '', price: '', duration: '', category: 'UMRAH', availableSlots: 20, startDate: '', endDate: '', image: '', flyerImage: '', hotelStars: 3 });
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
                                    <div className="glass-card p-8 border-2 border-primary/20 bg-primary/5 animate-slide-up">
                                        <h2 className="text-xl font-black font-serif mb-6">{editingId ? t('admin.form.edit') : t('admin.form.create')}</h2>
                                        <form onSubmit={handleAddPackage} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.form.title')}</label>
                                                <input required type="text" placeholder="e.g. Premium Umrah February" className="w-full p-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary outline-none bg-white font-medium" value={newPackage.title} onChange={e => setNewPackage({ ...newPackage, title: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.table.price')} ($)</label>
                                                <input required type="number" placeholder="2500" className="w-full p-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary outline-none bg-white font-medium" value={newPackage.price} onChange={e => setNewPackage({ ...newPackage, price: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.table.category')}</label>
                                                <select className="w-full p-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary outline-none bg-white font-medium appearance-none" value={newPackage.category} onChange={e => setNewPackage({ ...newPackage, category: e.target.value })}>
                                                    <option value="UMRAH">Umrah</option>
                                                    <option value="HAJJ">Hajj</option>
                                                    <option value="HOLIDAY">Holiday</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.form.hotelStars')}</label>
                                                <input required type="number" min="1" max="5" className="w-full p-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary outline-none bg-white font-medium" value={newPackage.hotelStars} onChange={e => setNewPackage({ ...newPackage, hotelStars: parseInt(e.target.value) })} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.form.flyerUrl')}</label>
                                                <input type="text" placeholder="https://..." className="w-full p-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary outline-none bg-white font-medium" value={newPackage.flyerImage} onChange={e => setNewPackage({ ...newPackage, flyerImage: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.form.startDate')}</label>
                                                <input required type="date" className="w-full p-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary outline-none bg-white font-medium" value={newPackage.startDate} onChange={e => setNewPackage({ ...newPackage, startDate: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('admin.form.endDate')}</label>
                                                <input required type="date" className="w-full p-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary outline-none bg-white font-medium" value={newPackage.endDate} onChange={e => setNewPackage({ ...newPackage, endDate: e.target.value })} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('packages.description')}</label>
                                                <textarea required rows="3" placeholder="Package details..." className="w-full p-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary outline-none bg-white font-medium" value={newPackage.description} onChange={e => setNewPackage({ ...newPackage, description: e.target.value })}></textarea>
                                            </div>
                                            <div className="md:col-span-2">
                                                <button type="submit" className="bg-secondary hover:bg-amber-600 text-white w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-secondary/20 transition-all active:scale-[0.98]">
                                                    {editingId ? t('admin.form.update') : t('admin.form.createBtn')}
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
                                                            {pkg.category}
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
                                            <tr>
                                                <td colSpan="4" className="p-24 text-center text-slate-400 font-serif italic text-2xl opacity-40">
                                                    {t('admin.table.noData')}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'media' && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-3xl font-serif">Media Assets</h1>
                                    <button className="btn-primary flex items-center space-x-2">
                                        <Plus size={20} />
                                        <span>Upload File</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                                            <ImageIcon size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Asset {i}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-sm">
                                    Tip: Official logos and spiritual hero assets are already integrated into the theme.
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
