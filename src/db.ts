import { PrismaClient } from './generated/prisma/client.js'
import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
// const adapter = new PrismaBetterSqlite3({
//   url: process.env.DATABASE_URL || 'file:./dev.db',
// })


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
