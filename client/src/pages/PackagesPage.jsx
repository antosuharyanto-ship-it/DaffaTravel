import { useEffect, useState } from 'react';
import api from '../utils/api';
import PackageCard from '../components/PackageCard';

const PackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await api.get('/packages');
                setPackages(res.data);
            } catch (error) {
                console.error("Error fetching packages", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const filteredPackages = filter === 'ALL'
        ? packages
        : packages.filter(p => p.category === filter);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="pb-20 pt-32">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="section-title">Explore Our Packages</h1>
                    <p className="text-slate-600 text-lg">
                        From spiritual pilgrimages to exotic holidays, find the perfect journey tailored for you.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    {['ALL', 'UMRAH', 'HAJJ', 'HOLIDAY'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${filter === cat
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredPackages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg) => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                        <div className="text-4xl mb-4">📍</div>
                        <h3 className="text-2xl font-serif text-slate-400">No packages found in this category</h3>
                        <p className="text-slate-400 mt-2">Check back soon for new exciting offers!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackagesPage;
