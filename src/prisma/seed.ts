import {PrismaClient} from '.prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Iniciando seed...');

	// Seed de Unit
	await prisma.unit.createMany({
		data: [
			{name: 'Kilogramo', nemonico: 'kg'},
			{name: 'Litro', nemonico: 'L'},
			{name: 'Unidad', nemonico: 'u'},
		],
	});
	console.log('✅ Se insertaron unidades');

	// Seed de Category
	await prisma.category.createMany({
		data: [
			{name: 'Frutas', icon: '🍎', color: '#FF5733'},
			{name: 'Verduras', icon: '🥦', color: '#4CAF50'},
			{name: 'Carnes', icon: '🥩', color: '#FF0000'},
		],
	});
	console.log('✅ Se insertaron categorías');

	// Seed de Place (Lugares de compra)
	await prisma.place.createMany({
		data: [
			{name: 'Supermercado Zapatoca', shortName: 'SZ', color: '#FFC107'},
			{name: 'Supermercado D1', shortName: 'D1', color: '#8BC34A'},
			{name: 'Plaza de Paloquemao', shortName: 'PP', color: '#03A9F4'},
			{name: 'Dollarcity', shortName: 'DC', color: '#FF9800'},
			{name: 'Almacenes Éxito', shortName: 'AX', color: '#F44336'},
			{name: 'Plaza Don Camilo', shortName: 'PDC', color: '#9C27B0'},
		],
	});
	console.log('✅ Se insertaron lugares de compra');

	// Seed de ProductStatus
	await prisma.productStatus.createMany({
		data: [
			{name: 'Disponible'},
			{name: 'Agotado'},
			{name: 'Próximo a vencer'},
		],
	});
	console.log('✅ Se insertaron estados de producto');

	console.log('🎉 Seed completado');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
