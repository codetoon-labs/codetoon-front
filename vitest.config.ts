import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    // tsconfig keeps JSX as-is for Next; tests need it compiled.
    oxc: { jsx: { runtime: 'automatic' } },
    resolve: {
        alias: { '@': fileURLToPath(new URL('./', import.meta.url)) },
    },
    test: {
        environment: 'node',
        include: ['**/*.test.ts'],
        exclude: ['node_modules/**', '.next/**', '.open-next/**', 'out/**'],
    },
});
