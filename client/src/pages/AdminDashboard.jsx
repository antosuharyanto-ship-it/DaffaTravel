import { useState, useEffect } from 'react';
import api from '../utils/api';
import { LayoutGrid, Package as PackageIcon, Users, Plus, Trash2, Edit2, AlertCircle, X, Check } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ packages: 0, bookings: 0, users: 0 });
    const [activeTab, setActiveTab] = useState('overview');
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPackage, setNewPackage] = useState({
        title: '',
        description: '',
        price: '',
        duration: '',
        category: 'UMRAH',
        availableSlots: 20,
        startDate: '',
        endDate: '',
        image: ''
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
            const res = await api.post('/packages', payload);
            setPackages([...packages, res.data]);
            setStats(prev => ({ ...prev, packages: prev.packages + 1 }));
            setShowAddForm(false);
            setNewPackage({ title: '', description: '', price: '', duration: '', category: 'UMRAH', availableSlots: 20, startDate: '', endDate: '', image: '' });
        } catch (error) {
            alert('Failed to add package: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="md:w-64 space-y-2">
                        <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold px-4 mb-4">Admin CMS</h2>
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-600 hover:bg-white'}`}
                        >
                            <LayoutGrid size={20} />
                            <span className="font-semibold">Overview</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('packages')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'packages' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-600 hover:bg-white'}`}
                        >
                            <PackageIcon size={20} />
                            <span className="font-semibold">Packages</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-600 hover:bg-white'}`}
                        >
                            <Users size={20} />
                            <span className="font-semibold">Bookings</span>
                        </button>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 bg-white rounded-3xl shadow-glass p-8 border border-slate-100">
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <h1 className="text-3xl font-serif">System Overview</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Total Packages</div>
                                        <div className="text-3xl font-bold text-primary">{stats.packages}</div>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Active Bookings</div>
                                        <div className="text-3xl font-bold text-secondary">{stats.bookings}</div>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Registered Users</div>
                                        <div className="text-3xl font-bold text-accent">{stats.users}</div>
                                    </div>
                                </div>
                                <div className="p-8 bg-blue-50 border border-blue-100 rounded-2xl flex items-start space-x-4">
                                    <AlertCircle className="text-blue-500 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-blue-900">Admin Tip</h3>
                                        <p className="text-blue-700 text-sm">Use the Packages tab to add new Umrah or Holiday offers. Changes appear instantly on the public site.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'packages' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-3xl font-serif">Manage Packages</h1>
                                    <button
                                        onClick={() => setShowAddForm(!showAddForm)}
                                        className="btn-primary !py-2 !px-4 flex items-center space-x-2 text-sm"
                                    >
                                        {showAddForm ? <X size={18} /> : <Plus size={18} />}
                                        <span>{showAddForm ? 'Cancel' : 'Add New'}</span>
                                    </button>
                                </div>

                                {showAddForm && (
                                    <div className="glass-card p-8 border-2 border-primary/20 bg-primary/5">
                                        <h2 className="text-xl font-bold mb-6">Create New Package</h2>
                                        <form onSubmit={handleAddPackage} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold mb-2">Package Title</label>
                                                <input required type="text" placeholder="e.g. Premium Umrah February" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" value={newPackage.title} onChange={e => setNewPackage({ ...newPackage, title: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">Price ($)</label>
                                                <input required type="number" placeholder="2500" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" value={newPackage.price} onChange={e => setNewPackage({ ...newPackage, price: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">Category</label>
                                                <select className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" value={newPackage.category} onChange={e => setNewPackage({ ...newPackage, category: e.target.value })}>
                                                    <option value="UMRAH">Umrah</option>
                                                    <option value="HAJJ">Hajj</option>
                                                    <option value="HOLIDAY">Holiday</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">Duration</label>
                                                <input required type="text" placeholder="10 Days" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" value={newPackage.duration} onChange={e => setNewPackage({ ...newPackage, duration: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">Slots</label>
                                                <input required type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" value={newPackage.availableSlots} onChange={e => setNewPackage({ ...newPackage, availableSlots: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">Start Date</label>
                                                <input required type="date" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" value={newPackage.startDate} onChange={e => setNewPackage({ ...newPackage, startDate: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">End Date</label>
                                                <input required type="date" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" value={newPackage.endDate} onChange={e => setNewPackage({ ...newPackage, endDate: e.target.value })} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold mb-2">Description</label>
                                                <textarea required rows="3" placeholder="Package details..." className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" value={newPackage.description} onChange={e => setNewPackage({ ...newPackage, description: e.target.value })}></textarea>
                                            </div>
                                            <div className="md:col-span-2">
                                                <button type="submit" className="btn-primary w-full shadow-emerald-500/20">Create Package</button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                <div className="overflow-x-auto border rounded-2xl">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 border-b">
                                            <tr>
                                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Package</th>
                                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Category</th>
                                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Price</th>
                                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {packages.map(pkg => (
                                                <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4">
                                                        <div className="font-bold">{pkg.title}</div>
                                                        <div className="text-xs text-slate-400">{pkg.duration}</div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                                            {pkg.category}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 font-bold text-primary">${pkg.price}</td>
                                                    <td className="p-4 text-right space-x-2">
                                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit2 size={16} /></button>
                                                        <button
                                                            onClick={() => handleDelete(pkg.id)}
                                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {packages.length === 0 && !loading && (
                                                <tr>
                                                    <td colSpan="4" className="p-12 text-center text-slate-400 font-serif italic text-lg opacity-60">No packages found. Start by adding one above.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'bookings' && (
                            <div className="space-y-6">
                                <h1 className="text-3xl font-serif">Manage Bookings</h1>
                                <div className="overflow-x-auto border rounded-2xl">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 border-b">
                                            <tr>
                                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">User / Contact</th>
                                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Package</th>
                                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Date</th>
                                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            <tr>
                                                <td colSpan="4" className="p-12 text-center text-slate-400 font-serif italic text-lg opacity-60">
                                                    Booking management requires updated backend relations.
                                                    Currently visualizing transaction logs in the overview statistics.
                                                </td>
                                            </tr>
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
