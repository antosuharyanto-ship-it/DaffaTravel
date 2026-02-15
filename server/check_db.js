const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("--- Checking Packages added in the last 24 hours ---");
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const pkgs = await prisma.package.findMany({
        where: {
            createdAt: { gte: oneDayAgo }
        },
        orderBy: { createdAt: 'desc' }
    });

    if (pkgs.length > 0) {
        pkgs.forEach(p => console.log(`Package: ${p.title} (Created: ${p.createdAt})`));
    } else {
        console.log("No new packages found.");
    }

    console.log("\n--- Checking Bookings/Transactions in the last 24 hours ---");
    const bookings = await prisma.booking.findMany({
        where: {
            bookingDate: { gte: oneDayAgo }
        },
        include: {
            package: true,
            user: true
        },
        orderBy: { bookingDate: 'desc' }
    });

    if (bookings.length > 0) {
        bookings.forEach(b => {
            console.log(`Booking ID: ${b.id} | User: ${b.user.name} | Package: ${b.package.title} | Status: ${b.status} | Date: ${b.bookingDate}`);
        });
    } else {
        console.log("No new bookings found.");
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
