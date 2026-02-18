const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const userCount = await prisma.user.count();
        const packageCount = await prisma.package.count();
        const bookingCount = await prisma.booking.count();
        const articleCount = await prisma.article.count();
        const galleryCount = await prisma.gallery.count();
        const testimonyCount = await prisma.testimony.count();

        console.log('--- Database Diagnostic ---');
        console.log(`Users: ${userCount}`);
        console.log(`Packages: ${packageCount}`);
        console.log(`Bookings: ${bookingCount}`);
        console.log(`Articles: ${articleCount}`);
        console.log(`Gallery: ${galleryCount}`);
        console.log(`Testimonials: ${testimonyCount}`);

        if (userCount > 0) {
            const lastUser = await prisma.user.findFirst({ orderBy: { createdAt: 'desc' } });
            console.log(`Last registered user: ${lastUser.email} (Created: ${lastUser.createdAt})`);
        }
    } catch (error) {
        console.error('Error connecting to database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
