import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/home' },
    { path: '/marked-list', component: '@/pages/marked-list/index' },
  ],
  fastRefresh: {},
  define: {
    'process.env.BACKEND_API_URL': 'http://localhost:3000',
  },
});
