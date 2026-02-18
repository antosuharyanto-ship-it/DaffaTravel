import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { ImageIcon, Filter, Maximize2 } from 'lucide-react';

const GalleryPage = () => {
    const { t, language } = useLanguage();
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await api.get('/gallery');
                setGallery(res.data);
            } catch (error) {
                console.error("Error fetching gallery", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const categories = ['ALL', 'UMRAH', 'HAJJ', 'HOLIDAY'];
    const filteredGallery = filter === 'ALL' ? gallery : gallery.filter(item => item.category === filter);

    return (
        <div className={`pt-32 pb-24 min-h-screen ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="max-w-4xl mb-16">
                    <span className="text-secondary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                        {t('gallery.tag') || 'Visual Journey'}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-[1.1] mb-6">
                        {t('gallery.title') || 'Our Spiritual'} <span className="text-primary italic">{t('gallery.titleAccent') || 'Moments'}</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-light leading-relaxed">
                        {t('gallery.desc') || 'Explore the serenity and devotion captured through our journeys across the holy lands and beyond.'}
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${filter === cat
                                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20'
                                    : 'bg-white text-slate-400 border border-slate-100 hover:border-primary/30'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <div key={n} className="aspect-square bg-slate-100 animate-pulse rounded-3xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredGallery.map(item => (
                            <div
                                key={item.id}
                                className="group relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-lg cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
                                onClick={() => setSelectedImage(item)}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.caption}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                    <span className="text-secondary font-black text-[10px] uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {item.category}
                                    </span>
                                    <p className="text-white font-serif italic text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        {item.caption}
                                    </p>
                                    <div className="mt-4 flex justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20">
                                            <Maximize2 size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredGallery.length === 0 && (
                            <div className="col-span-full py-32 text-center">
                                <ImageIcon size={64} className="mx-auto text-slate-200 mb-6" />
                                <p className="text-slate-400 font-serif italic text-2xl">{t('gallery.noData') || 'No photos found in this category.'}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setSelectedImage(null)}></div>
                    <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center gap-6">
                        <button
                            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            CLOSE [X]
                        </button>
                        <div className="w-full aspect-video md:aspect-auto md:h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                            <img
                                src={selectedImage.imageUrl}
                                alt={selectedImage.caption}
                                className="w-full h-full object-contain bg-black"
                            />
                        </div>
                        <div className="text-center max-w-2xl px-6">
                            <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">
                                {selectedImage.category}
                            </span>
                            <h2 className="text-white font-serif italic text-3xl md:text-4xl text-balance">
                                "{selectedImage.caption}"
                            </h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
