import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Configuracion from '../views/Configuracion.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: 'configuracion'
  },
  {
    path: '/configuracion',
    name: 'configuracion',
    component: Configuracion
  },
  {
    path: '/resultados',
    name: 'resultados',
    component: () => import(/* webpackChunkName: "resultados" */ '../views/Resultados.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
