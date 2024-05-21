import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'home',
      path: '/login',
      component: () => import('~/pages/reservation.vue').then((r) => r.default || r),
    },
  ],
}
