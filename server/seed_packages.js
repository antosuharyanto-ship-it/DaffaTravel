const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const packages = [
    {
        title: "Paket Haji Khusus 2024 - Garuda Indonesia",
        description: "Program Haji Khusus 28 hari dengan fasilitas hotel bintang 5. Penerbangan langsung Garuda Indonesia. Termasuk perlengkapan haji lengkap.",
        price: 275000000, // Approx $17,500
        type: "HAJJ",
        duration: "28 Hari",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-05-29"),
        availableSlots: 15,
        hotelStars: 5,
        flyerImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80"
    },
    {
        title: "Umroh Itikaf Ramadhan 1445 H",
        description: "Program khusus Itikaf di bulan Ramadhan. Full 16 hari ibadah dengan bimbingan ustadz.",
        price: 38500000,
        type: "UMRAH",
        duration: "16 Hari",
        startDate: new Date("2024-03-20"),
        endDate: new Date("2024-04-05"),
        availableSlots: 20,
        hotelStars: 4,
        flyerImage: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&q=80"
    },
    {
        title: "Umroh Awal Ramadhan 2024",
        description: "Buka puasa pertama di tanah suci. Paket 12 hari yang penuh berkah.",
        price: 32500000,
        type: "UMRAH",
        duration: "12 Hari",
        startDate: new Date("2024-03-10"),
        endDate: new Date("2024-03-22"),
        availableSlots: 25,
        hotelStars: 4,
        flyerImage: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80"
    },
    {
        title: "Umroh Ramadhan 03 Maret 2026",
        description: "Paket Umroh penuh berkah di bulan Ramadhan 2026. Fasilitas lengkap dengan bimbingan ibadah.",
        price: 32750000,
        type: "UMRAH",
        duration: "12 Hari",
        startDate: new Date("2026-03-03"),
        endDate: new Date("2026-03-15"),
        availableSlots: 30,
        hotelStars: 4,
        flyerImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80"
    },
    {
        title: "Wisata Bangkok Awal Februari 2024",
        description: "Nikmati keindahan kota Bangkok di awal tahun. Paket wisata kuliner dan belanja.",
        price: 8500000,
        type: "HOLIDAY",
        duration: "5 Hari",
        startDate: new Date("2024-02-05"),
        endDate: new Date("2024-02-10"),
        availableSlots: 20,
        hotelStars: 5,
        flyerImage: "https://images.unsplash.com/photo-1508933254924-8960091ca97e?auto=format&fit=crop&q=80"
    },
    {
        title: "Wisata Jepang Murah",
        description: "Jelajahi keajaiban Jepang dengan harga terjangkau. Tokyo, Kyoto, dan Osaka.",
        price: 8000000,
        type: "HOLIDAY",
        duration: "7 Hari",
        startDate: new Date("2024-09-10"),
        endDate: new Date("2024-09-17"),
        availableSlots: 15,
        hotelStars: 5,
        flyerImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80"
    }
];

async function seed() {
    console.log("Seeding packages...");
    for (const pkg of packages) {
        await prisma.package.create({ data: pkg });
        console.log(`Created package: ${pkg.title}`);
    }
    console.log("Seeding complete.");
}

seed()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
