import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';

const PackageCard = ({ pkg }) => {
    return (
        <div className="glass-card group overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={pkg.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80'}
                    alt={pkg.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 bg-secondary text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                        {pkg.category}
                    </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <div className="text-2xl font-serif font-bold text-secondary">${pkg.price}</div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                    {pkg.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-1">
                    {pkg.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-slate-500 text-xs">
                        <Clock size={14} className="mr-2 text-primary" />
                        <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center text-slate-500 text-xs">
                        <Users size={14} className="mr-2 text-primary" />
                        <span>{pkg.availableSlots} Left</span>
                    </div>
                </div>

                <Link
                    to={`/packages/${pkg.id}`}
                    className="w-full btn-primary !py-3 flex items-center justify-center space-x-2 group-hover:bg-accent"
                >
                    <span>View Details</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default PackageCard;
