const { PrismaClient } = require('@prisma/client');

let prisma;

if (!global.prisma) {
    global.prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
}

prisma = global.prisma;

module.exports = prisma;
