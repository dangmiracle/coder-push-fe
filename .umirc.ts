import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  define: {
    'process.env.BACKEND_API_URL': 'http://localhost:3000',
  },
});
