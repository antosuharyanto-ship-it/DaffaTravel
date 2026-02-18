import React from 'react';

const RunningBanner = () => {
    return (
        <div className="bg-slate-900 text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/5 relative z-[60]">
            <div className="inline-block animate-marquee px-4">
                <span className="mx-8 text-[10px] font-bold uppercase tracking-[0.2em]">Want to plan your trip with your own itinerary and budget and share with others? Here is your tools: <a href="https://www.adventurer.id" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline ml-1">www.adventurer.id</a></span>
                <span className="mx-8 text-[10px] font-bold uppercase tracking-[0.2em]">Want to plan your trip with your own itinerary and budget and share with others? Here is your tools: <a href="https://www.adventurer.id" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline ml-1">www.adventurer.id</a></span>
                <span className="mx-8 text-[10px] font-bold uppercase tracking-[0.2em]">Want to plan your trip with your own itinerary and budget and share with others? Here is your tools: <a href="https://www.adventurer.id" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline ml-1">www.adventurer.id</a></span>
            </div>
            <style jsx="true">{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default RunningBanner;
