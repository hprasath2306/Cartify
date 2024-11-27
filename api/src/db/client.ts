import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Initialize once and reuse

export default prisma;
