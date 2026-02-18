import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppLink = () => {
    const phoneNumber = '6287768062507';
    const message = 'Halo Daffa Tour, saya ingin bertanya tentang paket Umroh/Haji/Wisata.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap">
                Chat With Us
            </span>
        </a>
    );
};

export default WhatsAppLink;
