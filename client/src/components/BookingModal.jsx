import React, { useState } from 'react';
import { X, CreditCard, Landmark, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BookingModal = ({ isOpen, onClose, pkg }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1); // 1: Method Selection, 2: Confirmation/Payment
    const [method, setMethod] = useState(null);

    if (!isOpen) return null;

    const bankAccounts = [
        {
            bank: 'BCA',
            number: '004 624 6246',
            owner: 'PT ANDITY KREASI MANDIRI',
            branch: 'Cabang Blok F Tanah Abang',
            color: 'bg-blue-600'
        },
        {
            bank: 'Bank DKI',
            number: '303 080 44 914',
            owner: 'PT ANDITY KREASI MANDIRI',
            branch: 'Cabang Walikota Jakarta Barat',
            color: 'bg-red-600'
        },
        {
            bank: 'BSI',
            number: '4000 500 556',
            owner: 'PT ANDITY KREASI MANDIRI',
            branch: 'Cabang Salemba',
            color: 'bg-teal-600'
        },
        {
            bank: 'Bukopin Syariah',
            number: '880 3487 104',
            owner: 'PT ANDITY KREASI MANDIRI',
            branch: 'Cabang Salemba Raya',
            color: 'bg-green-600'
        }
    ];

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(t('packages.modal.copySuccess'));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{t('packages.modal.title')}</h2>
                        <p className="text-sm text-slate-500">{pkg.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8">
                    {step === 1 ? (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold">{t('packages.modal.methodTitle')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setMethod('MIDTRANS')}
                                    className={`p-6 border-2 rounded-2xl flex flex-col items-start transition-all ${method === 'MIDTRANS' ? 'border-primary bg-primary/5' : 'hover:border-slate-300'}`}
                                >
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary mb-4">
                                        <CreditCard size={24} />
                                    </div>
                                    <span className="font-bold">{t('packages.modal.gatewayTitle')}</span>
                                    <span className="text-xs text-slate-500 mt-1">{t('packages.modal.gatewayDesc')}</span>
                                </button>
                                <button
                                    onClick={() => setMethod('TRANSFER')}
                                    className={`p-6 border-2 rounded-2xl flex flex-col items-start transition-all ${method === 'TRANSFER' ? 'border-primary bg-primary/5' : 'hover:border-slate-300'}`}
                                >
                                    <div className="p-3 bg-secondary/10 rounded-xl text-secondary mb-4">
                                        <Landmark size={24} />
                                    </div>
                                    <span className="font-bold">{t('packages.modal.transferTitle')}</span>
                                    <span className="text-xs text-slate-500 mt-1">{t('packages.modal.transferDesc')}</span>
                                </button>
                            </div>

                            <button
                                disabled={!method}
                                onClick={() => setStep(2)}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-4 py-4 flex items-center justify-center space-x-2"
                            >
                                <span>{t('packages.modal.continue')}</span>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-fade-in">
                            {method === 'MIDTRANS' ? (
                                <div className="text-center py-12 space-y-4">
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
                                        <CreditCard size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold">{t('packages.modal.connecting')}</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto">{t('packages.modal.connectingDesc')}</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start space-x-3">
                                        <CheckCircle2 size={20} className="text-orange-500 mt-0.5" />
                                        <p className="text-xs text-orange-800 leading-relaxed font-medium">
                                            {t('packages.modal.transferNote')}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {bankAccounts.map((acc, i) => (
                                            <div key={i} className="p-5 border rounded-2xl hover:border-primary transition-colors flex justify-between items-center group">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 ${acc.color} text-white font-bold rounded-xl flex items-center justify-center text-xs`}>
                                                        {acc.bank}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="font-mono font-bold text-lg tracking-wider">{acc.number}</span>
                                                            <button
                                                                onClick={() => copyToClipboard(acc.number)}
                                                                className="p-1 text-slate-400 hover:text-primary transition-colors"
                                                            >
                                                                <Copy size={16} />
                                                            </button>
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{acc.owner}</div>
                                                        <div className="text-[9px] text-slate-400 uppercase">{acc.branch}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        {t('packages.modal.back')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
