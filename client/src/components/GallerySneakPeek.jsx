import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { ImageIcon, ArrowRight } from 'lucide-react';

const GallerySneakPeek = () => {
    const { t, language } = useLanguage();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await api.get('/gallery');
                setImages(res.data.slice(0, 6));
            } catch (error) {
                console.error("Error fetching gallery", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    if (!loading && images.length === 0) return null;

    return (
        <section className="py-24 bg-slate-950 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-8 ${language === 'ar' ? 'md:flex-row-reverse text-right' : ''}`}>
                    <div className="max-w-2xl">
                        <div className={`flex items-center gap-3 mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span className="w-12 h-[1px] bg-secondary"></span>
                            <span className="text-secondary font-black text-xs uppercase tracking-[0.3em]">
                                {t('gallery.tag')}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight">
                            {t('gallery.title')} <span className="text-primary italic">{t('gallery.titleAccent')}</span>
                        </h2>
                    </div>
                    <Link to="/gallery" className="btn-primary !bg-white !text-slate-900 hover:!bg-secondary hover:!text-white !px-10 !py-4 text-xs">
                        View Full Gallery
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {loading ? (
                        [1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className="aspect-square bg-white/5 animate-pulse rounded-2xl"></div>
                        ))
                    ) : (
                        images.map((image, index) => (
                            <div
                                key={image.id}
                                className={`group relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer ${index % 2 === 0 ? 'mt-0' : 'md:mt-8'
                                    }`}
                            >
                                <img
                                    src={image.imageUrl}
                                    alt={image.caption}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                                />
                                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <ImageIcon size={32} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default GallerySneakPeek;
