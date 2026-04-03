import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://eherozhao.github.io',
  base: '/historyIsFun/',
  integrations: [tailwind()],
});
