import { RateLimiter } from 'sveltekit-rate-limiter/server';

export const limiter = new RateLimiter({
	// A rate is defined as [number, unit]
	IPUA: [3, '5m']
});
