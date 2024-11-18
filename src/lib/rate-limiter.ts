import { RateLimiter } from 'sveltekit-rate-limiter/server';

export const guestLimiter = new RateLimiter({
	IPUA: [3, 'd']
});
