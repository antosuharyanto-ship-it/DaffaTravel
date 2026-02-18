import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon, Sparkles } from 'lucide-react';

const ArticleDetailPage = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await api.get(`/articles/${id}`);
                setArticle(res.data);
            } catch (error) {
                console.error("Error fetching article", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!article) return <div className="pt-32 p-20 text-center font-serif text-2xl text-slate-400">Article not found</div>;

    return (
        <div className={`pt-32 pb-24 min-h-screen ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <Link to="/articles" className={`inline-flex items-center text-primary font-bold hover:translate-x-1 transition-transform mb-12 group ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <ArrowLeft size={18} className={`${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'} group-hover:-translate-x-1 transition-transform`} />
                    Back to Insights
                </Link>

                {/* Article Header */}
                <header className="mb-16">
                    <div className={`flex items-center gap-4 text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className="flex items-center">
                            <Calendar size={14} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-secondary`} />
                            {new Date(article.createdAt).toLocaleDateString()}
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="flex items-center text-secondary">
                            <Sparkles size={14} className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                            Spiritual Wisdom
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 leading-[1.1] mb-12">
                        {article.title}
                    </h1>
                    <div className="relative h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-slate-100">
                        <img
                            src={article.imageUrl || 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80'}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </header>

                {/* Content */}
                <article className="prose prose-slate prose-lg max-w-none mb-16">
                    <div className="bg-slate-50/50 p-10 md:p-16 rounded-[2.5rem] border border-slate-100">
                        {article.content.split('\n').map((para, i) => (
                            <p key={i} className="text-slate-600 leading-[1.9] font-light text-xl mb-6 last:mb-0 first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:text-primary first-letter:mr-4 first-letter:float-left">
                                {para}
                            </p>
                        ))}
                    </div>
                </article>

                {/* Footer Sharing */}
                <footer className="pt-16 border-t border-slate-100">
                    <div className={`flex flex-col md:flex-row justify-between items-center gap-8 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                                <User size={28} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Published By</div>
                                <div className="text-lg font-black text-slate-900">Daffa Editorial Team</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Share With Friends</span>
                            <div className="flex gap-2">
                                <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-secondary hover:text-white transition-all"><Facebook size={20} /></button>
                                <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-secondary hover:text-white transition-all"><Twitter size={20} /></button>
                                <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-secondary hover:text-white transition-all"><LinkIcon size={20} /></button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ArticleDetailPage;
