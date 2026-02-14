import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    {
        id: 'umrah',
        title: 'Umrah Packages',
        description: 'Spiritual journeys to the holy cities with premium stay and guidance.',
        icon: '🕋',
        color: 'bg-emerald-500',
        path: '/packages?category=UMRAH'
    },
    {
        id: 'hajj',
        title: 'Hajj Special',
        description: 'Complete Hajj experience with dedicated support and elite facilities.',
        icon: '🌙',
        color: 'bg-amber-500',
        path: '/packages?category=HAJJ'
    },
    {
        id: 'holiday',
        title: 'Luxury Holidays',
        description: 'Explore the world’s most beautiful destinations in style.',
        icon: '✈️',
        color: 'bg-teal-500',
        path: '/packages?category=HOLIDAY'
    }
];

const CategorySection = () => {
    return (
        <section className="container mx-auto px-4 py-16 -mt-20 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        to={cat.path}
                        className="glass-card group p-8 hover:bg-white transition-all duration-500 transform hover:-translate-y-2"
                    >
                        <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:rotate-12 transition-transform`}>
                            {cat.icon}
                        </div>
                        <h3 className="text-2xl font-serif mb-3 group-hover:text-primary transition-colors">{cat.title}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            {cat.description}
                        </p>
                        <div className="flex items-center text-secondary font-bold group-hover:translate-x-2 transition-transform">
                            <span>Explore Now</span>
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
