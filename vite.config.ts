import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(async ({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const react = await import('@vitejs/plugin-react').then(m => m.default);
    
    return {
      base: '/',
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        fs: {
          strict: false
        },
        headers: {
          'Content-Type': 'application/javascript'
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: undefined,
            format: 'es'
          }
        },
        copyPublicDir: true
      },
      esbuild: {
        target: 'es2022'
      }
    };
});
