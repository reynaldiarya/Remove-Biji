import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts,svx}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	theme: {
		extend: {}
	},

	plugins: [
		skeleton({
			themes: { preset: ['skeleton'] }
		}),
		typography()
	]
} satisfies Config;
