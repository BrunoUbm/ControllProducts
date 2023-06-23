
const routes = [
  {
    path: '/',
    component: () => import('../pages/loginPage.vue'),
    name: 'login'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/menu',
    component: () => import('../pages/MenuPage.vue'),
    name: 'menu',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') != undefined) {
        next()
      }
      else{
        next("/")
      }
    }
  }
]

export default routes
