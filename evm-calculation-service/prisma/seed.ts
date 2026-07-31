import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.activity.deleteMany();
  await prisma.project.deleteMany();

  await prisma.project.create({
    data: {
      name: 'Proyecto ERP',
      description: 'Implementación del módulo de gestión de proyectos con EVM.',
      activities: {
        create: [
          {
            name: 'Diseño de base de datos',
            bac: 15000,
            plannedPercent: 60,
            executedPercent: 55,
            actualCost: 9000,
            startDate: new Date('2026-07-01'),
            endDate: new Date('2026-07-31'),
          },
          {
            name: 'Desarrollo del API',
            bac: 25000,
            plannedPercent: 45,
            executedPercent: 40,
            actualCost: 11000,
            startDate: new Date('2026-07-15'),
            endDate: new Date('2026-08-30'),
          },
          {
            name: 'Dashboard Angular',
            bac: 18000,
            plannedPercent: 30,
            executedPercent: 25,
            actualCost: 5200,
            startDate: new Date('2026-08-01'),
            endDate: new Date('2026-09-15'),
          },
        ],
      },
    },
  });

  console.log('Base de datos inicializada con datos de ejemplo.');
}

main()
  .catch((error) => {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
