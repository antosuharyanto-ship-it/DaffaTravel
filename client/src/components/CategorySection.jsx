import { Link } from 'react-router-dom';
import umrahBg from '../assets/umrah_bg.jpg';
import holidayBg from '../assets/holiday_bg.jpg';

const categories = [
    {
        id: 'umrah',
        title: 'Umrah Packages',
        subtitle: 'باقات العمرة',
        indonesian: 'Paket Umrah Premium',
        description: 'Spiritual journeys to the holy cities with premium stay and guidance.',
        icon: '🕋',
        bg: umrahBg,
        path: '/packages?category=UMRAH'
    },
    {
        id: 'hajj',
        title: 'Hajj Special',
        subtitle: 'حج مخصص',
        indonesian: 'Haji Khusus & Furoda',
        description: 'Complete Hajj experience with dedicated support and elite facilities.',
        icon: '🌙',
        bg: umrahBg,
        path: '/packages?category=HAJJ'
    },
    {
        id: 'holiday',
        title: 'Luxury Holidays',
        subtitle: 'عطلات فاخرة',
        indonesian: 'Wisata Halal Mancanegara',
        description: 'Explore the world’s most beautiful destinations in style.',
        icon: '✈️',
        bg: holidayBg,
        path: '/packages?category=HOLIDAY'
    }
];

const CategorySection = () => {
    return (
        <section className="container mx-auto px-4 py-20 -mt-24 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        to={cat.path}
                        className="relative group h-80 rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/30 transition-all duration-500 transform hover:-translate-y-2"
                    >
                        {/* Background with Zoom Effect */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${cat.bg})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                {cat.icon}
                            </div>
                            <div className="space-y-1 mb-2">
                                <span className="block text-xs font-bold text-secondary uppercase tracking-[0.2em]">{cat.subtitle}</span>
                                <h3 className="text-2xl font-serif text-white font-black tracking-tight group-hover:text-secondary transition-colors duration-300">
                                    {cat.title}
                                </h3>
                                <span className="block text-[10px] text-white/60 font-medium italic">{cat.indonesian}</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                {cat.description}
                            </p>
                            <div className="flex items-center text-white/80 group-hover:text-secondary font-bold tracking-widest uppercase text-[10px] transition-all duration-300">
                                <span>Explore Catalog</span>
                                <div className="ml-3 h-[1px] w-8 bg-white/30 group-hover:w-12 group-hover:bg-secondary transition-all duration-500"></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
