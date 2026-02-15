import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight, Star } from 'lucide-react';

const PackageCard = ({ pkg }) => {
    // Determine hotel stars array
    const stars = Array.from({ length: pkg.hotelStars || 3 }, (_, i) => i);

    return (
        <div className="glass-card group overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 bg-white border border-slate-100">
            {/* Image Section - Focuses on Promo Flyer */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={pkg.flyerImage || pkg.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80'}
                    alt={pkg.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        {pkg.type}
                    </span>
                </div>

                {/* Hotel Stars Overlay */}
                <div className="absolute top-4 right-4 flex space-x-0.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                    {stars.map((n) => (
                        <Star key={n} size={10} className="fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1 bg-white">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {pkg.title}
                    </h3>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-slate-500 text-[11px] font-medium">
                    <div className="flex items-center">
                        <Clock size={14} className="mr-1.5 text-secondary" />
                        <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center">
                        <Users size={14} className="mr-1.5 text-secondary" />
                        <span>{pkg.availableSlots} Sisa</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Mulai Dari</span>
                        <div className="text-xl font-black text-primary">
                            Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}
                        </div>
                    </div>
                    <Link
                        to={`/packages/${pkg.id}`}
                        className="p-3 bg-slate-900 text-white rounded-xl hover:bg-primary transition-all group/btn"
                    >
                        <ArrowRight size={20} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
