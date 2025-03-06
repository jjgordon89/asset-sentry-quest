import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /\/index/, to: '/index.html' }
      ]
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700000,
    // Optimize build output
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for production build
    sourcemap: mode !== 'production',
    // Minify output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: ['console.info', 'console.debug'],
        passes: 3,
      },
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query'
          ],
          ui: [
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-slot',
            '@hookform/resolvers',
            'date-fns',
            'react-day-picker'
          ],
          charts: ['recharts'],
          forms: ['zod', 'react-hook-form']
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query',
          ],
          ui: [
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-slot',
            '@hookform/resolvers',
            'date-fns',
            'react-day-picker',
          ],
          charts: ['recharts'],
          forms: ['zod', 'react-hook-form']
        },
      },
    },
  },
}));
