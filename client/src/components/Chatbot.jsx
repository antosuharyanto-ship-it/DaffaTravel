import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const Chatbot = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: t('chatbot.welcome') }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await api.post('/chatbot', { message: input });
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: t('chatbot.error') }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[90]">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-slate-900 rotate-90' : 'bg-primary hover:scale-110'}`}
            >
                {isOpen ? <X className="text-white" size={24} /> : <MessageSquare className="text-white" size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[90vw] md:w-[420px] h-[600px] bg-white/90 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 flex flex-col overflow-hidden animate-slide-up origin-bottom-right">
                    {/* Header */}
                    <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-white/10 shadow-inner">
                                <Bot size={28} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="font-serif font-black text-base tracking-tight italic">Daffa AI <span className="text-secondary">Concierge</span></h3>
                                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-white/60">
                                    <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse shadow-[0_0_8px_#F59E0B]"></span>
                                    Spiritually Guided
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-50 to-white">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex max-w-[85%] space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-slate-200' : 'bg-primary/10 border border-primary/20'}`}>
                                        {m.role === 'user' ? <User size={18} className="text-slate-600" /> : <Bot size={18} className="text-primary" />}
                                    </div>
                                    <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'}`}>
                                        {m.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex max-w-[80%] space-x-3">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                        <Bot size={18} className="text-primary" />
                                    </div>
                                    <div className="p-4 bg-white text-slate-400 rounded-[1.5rem] rounded-tl-none shadow-sm flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100 flex items-center space-x-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('chatbot.placeholder')}
                                className="w-full p-4 pr-12 bg-slate-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/20 transition-all font-medium placeholder:text-slate-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-slate-900 shadow-xl shadow-primary/20 hover:shadow-slate-900/20 disabled:opacity-50 transition-all transform active:scale-95"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
