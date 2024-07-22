import { useBlockchain } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import { setupLayouts } from "virtual:generated-layouts";
// @ts-ignore
import routes from "~pages";
import DefaultLayout from '@/layouts/components/DefaultLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [{
        path: '',
        component: () => import('../modules/[chain]/index.vue'),
      }]
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../pages/[...all].vue'),
      meta: {
        layout: 'blank',
      }
    },
    ...setupLayouts(routes),
  ],
});

//update current blockchain
router.beforeEach((to) => {
    const chain  = 'ordibank'
    console.log("beforeEach chain: ", chain)
    if(chain){
      const blockchain= useBlockchain()
      if(chain !== blockchain.chainName) {
        blockchain.setCurrent(chain.toString())
      }
    } 
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router;