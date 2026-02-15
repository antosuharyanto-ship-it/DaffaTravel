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
        title: "Wisata Malaysia - Kuala Lumpur",
        description: "Paket wisata hemat ke Malaysia. Termasuk Genting Highlands dan City Tour.",
        price: 6500000,
        type: "HOLIDAY",
        duration: "4 Hari",
        startDate: new Date("2024-08-15"),
        endDate: new Date("2024-08-19"),
        availableSlots: 40,
        hotelStars: 4,
        flyerImage: "https://images.unsplash.com/photo-1529626455594-4ff0832cfb5e?auto=format&fit=crop&q=80"
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
