const { PrismaClient } = require('@prisma/client');

// Prisma 7 requires passing an options object (even if empty)
let prisma;

if (!global.prisma) {
    global.prisma = new PrismaClient({});
}

prisma = global.prisma;

module.exports = prisma;
