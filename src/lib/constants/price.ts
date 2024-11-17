type Package = {
	value: number;
	totalPrice: number;
	pricePerImage: number;
};

export const packages: Package[] = [
	{
		value: 10,
		totalPrice: 12_250,
		pricePerImage: 1_225
	},
	{
		value: 50,
		totalPrice: 53_250,
		pricePerImage: 1_065
	},
	{
		value: 100,
		totalPrice: 92_600,
		pricePerImage: 926
	},
	{
		value: 200,
		totalPrice: 161_000,
		pricePerImage: 805
	},
	{
		value: 500,
		totalPrice: 350_000,
		pricePerImage: 700
	}
];
