import biome from 'eslint-config-biome';

export default [
	// other configs,
	{
		ignores: [
			'node_modules',
			'pnpm-lock.yaml',
			'.output',
			'.vinxi',
			'routeTree.gen.ts',
		],
	},
	biome,
];
