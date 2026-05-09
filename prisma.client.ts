import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/app/generated/prisma/client"
import "dotenv/config"

const adapter = new PrismaPg({
	connectionString: process.env["DATABASE_URL"]
})

export const prisma = new PrismaClient({ adapter })

process.on("beforeExit", async () => {
	await prisma.$disconnect()
})