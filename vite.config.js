import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('a-')
      }
    }
  }), cloudflare()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})