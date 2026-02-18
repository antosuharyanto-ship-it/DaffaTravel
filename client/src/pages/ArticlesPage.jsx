import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, ArrowRight, FileText } from 'lucide-react';

const ArticlesPage = () => {
    const { t, language } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await api.get('/articles');
                setArticles(res.data);
            } catch (error) {
                console.error("Error fetching articles", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className={`pt-32 pb-24 min-h-screen bg-slate-50/50 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] mb-4 block">
                        {t('blog.tag') || 'Spiritual Insights'}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-tight mb-6">
                        {t('blog.title') || 'Guidance &'} <span className="text-primary italic">{t('blog.titleAccent') || 'Reflections'}</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-light leading-relaxed">
                        {t('blog.desc') || 'Deepen your spiritual understanding with our curated articles on Umrah, Hajj, and the beauty of faith explorations.'}
                    </p>
                </div>

                {/* List */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className="h-[450px] bg-white rounded-[2.5rem] shadow-sm animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {articles.map(article => (
                            <Link
                                to={`/articles/${article.id}`}
                                key={article.id}
                                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={article.imageUrl || 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80'}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                                            <span className="text-secondary font-black text-[10px] uppercase tracking-widest">Article</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-10 flex-1 flex flex-col">
                                    <div className={`flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                        <div className="flex items-center">
                                            <Calendar size={14} className={`${language === 'ar' ? 'ml-1.5' : 'mr-1.5'} text-primary`} />
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                        <div className="flex items-center">
                                            <User size={14} className={`${language === 'ar' ? 'ml-1.5' : 'mr-1.5'} text-primary`} />
                                            Admin
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-serif font-black text-slate-900 leading-snug mb-4 group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="text-slate-500 line-clamp-3 font-light leading-relaxed mb-8 flex-1">
                                        {article.content.substring(0, 150)}...
                                    </p>
                                    <div className={`pt-6 border-t border-slate-50 flex items-center text-primary font-black text-xs uppercase tracking-[0.2em] group-hover:gap-2 transition-all ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                        READ MORE
                                        <ArrowRight size={16} className={`${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {articles.length === 0 && (
                            <div className="col-span-full py-32 text-center">
                                <FileText size={64} className="mx-auto text-slate-200 mb-6" />
                                <p className="text-slate-400 font-serif italic text-2xl">{t('blog.noData') || 'No articles published yet.'}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticlesPage;
