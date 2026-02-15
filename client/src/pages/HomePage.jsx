import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import WhyChooseUs from '../components/WhyChooseUs';
import CampaignSpotlight from '../components/CampaignSpotlight';
import PackageCard from '../components/PackageCard';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
    const { t } = useLanguage();
    const [featuredPackages, setFeaturedPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await api.get('/packages');
                // Ensure res.data is an array before slicing
                const packagesData = Array.isArray(res.data) ? res.data : [];
                setFeaturedPackages(packagesData.slice(0, 3));
            } catch (error) {
                console.error("Error fetching packages", error);
                setFeaturedPackages([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    return (
        <div className="pb-20">
            <Hero />
            <CategorySection />
            <WhyChooseUs />
            <CampaignSpotlight />

            <section className="container mx-auto px-4 py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="section-title">{t('home.featuredTitle')}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {t('home.featuredDesc')}
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(n => (
                            <div key={n} className="h-96 bg-slate-100 animate-pulse rounded-3xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredPackages.map((pkg) => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                        {featuredPackages.length === 0 && (
                            <div className="col-span-full text-center py-12 text-slate-400 font-serif text-xl border-2 border-dashed border-slate-200 rounded-3xl">
                                {t('home.noPackages')}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Link to="/packages" className="btn-primary">
                        {t('home.viewAll')}
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
