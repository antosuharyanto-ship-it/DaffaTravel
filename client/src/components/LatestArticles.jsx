import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

const LatestArticles = () => {
    const { t, language } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await api.get('/articles');
                setArticles(res.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching articles", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    if (!loading && articles.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50/50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-8 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="max-w-2xl">
                        <div className={`flex items-center gap-3 mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span className="w-12 h-[1px] bg-secondary"></span>
                            <span className="text-secondary font-black text-xs uppercase tracking-[0.3em]">
                                {t('blog.tag')}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 leading-tight">
                            {t('blog.latest')}
                        </h2>
                    </div>
                    <Link to="/articles" className="btn-secondary !px-10 !py-4 text-xs">
                        {t('blog.viewAll')}
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map(n => (
                            <div key={n} className="h-[400px] bg-white rounded-[2.5rem] animate-pulse"></div>
                        ))
                    ) : (
                        articles.map((article, index) => (
                            <Link
                                key={article.id}
                                to={`/articles/${article.id}`}
                                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
                            >
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={article.imageUrl || 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80'}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-secondary shadow-lg">
                                            New Insight
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className={`flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                        <Calendar size={12} className="text-primary" />
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </div>
                                    <h3 className="text-xl font-serif font-black text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm line-clamp-3 font-light leading-relaxed mb-6 flex-1">
                                        {article.content}
                                    </p>
                                    <div className={`flex items-center text-primary font-black text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                        READ MORE
                                        <ArrowRight size={14} className={`${language === 'ar' ? 'mr-1.5 rotate-180' : 'ml-1.5'}`} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default LatestArticles;
