import { z } from 'zod';

export const createPaymentSchema = z.object({
	package: z.number()
});
