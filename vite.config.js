import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [vue()],
        build: {
            minify: true,
            cssCodeSplit: false,
            emptyOutDir: true,
            lib: {
                entry: resolve(__dirname, 'src/main.js'),
                name: 'Bl2 FileManager',
                fileName: 'bl2-filemanager',
              },
            // assetsDir: '.',
            rollupOptions: {
                output: {
                    dir: `${env.VITE_APP_LARAVEL_PATH}/resources/file-manager`,
                    entryFileNames: `file-manager.js`,
                    // chunkFileNames: `[name].js`,
                    assetFileNames: `[name].[ext]`,
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    charset: false,
                    // additionalData: command === 'serve' ? '' : '$bootstrap-icons-font-dir: "../fonts";',
                }
            }
        },
    }
});