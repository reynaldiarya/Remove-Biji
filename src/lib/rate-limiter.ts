import { RateLimiter } from 'sveltekit-rate-limiter/server';

export const limiter = new RateLimiter({
	// A rate is defined as [number, unit]
	IP: [4, '10m'], // IP address limiter
	IPUA: [2, 'm'] // IP + User Agent limiter
});
