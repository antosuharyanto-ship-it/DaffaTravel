const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetPassword() {
    const email = 'anto.suharyanto@gmail.com';
    const newPassword = 'Password123!'; // Temporary password

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await prisma.user.update({
            where: { email: email },
            data: { password: hashedPassword },
        });
        console.log(`Successfully reset password for: ${user.email}`);
        console.log(`New temporary password: ${newPassword}`);
    } catch (error) {
        console.error('Error resetting password:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

resetPassword();
