// src/router.js (formerly index.js)
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Signup from './components/signup.vue'
import Feature from './components/feature.vue'
import Contact from './components/contact.vue'
import AdminDashboard from './components/admin/dashboard.vue'
import Landing from './components/landing.vue'
import Login from './components/login.vue'
import ProductList from './components/product_list.vue'
import SingleProduct from './components/single_product.vue'
import Cart from './components/cart.vue'
import Checkout from './components/checkout.vue'
import Orders from './components/orders.vue'
import Profile from './components/profile.vue'
import Rating from './components/rating.vue'
import AddProduct from './components/admin/add_product.vue'
import EditProduct from './components/admin/edit_product.vue'
import AddAdmin from './components/admin/add_admin.vue'
import UpdateOrder from './components/admin/update_order.vue'


const routes = [
  { path: '/', component: Landing, name: 'Landing' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/signup', component: Signup, name: 'Signup' },
  { path: '/feature', component: Feature, name: 'Feature' },
  { path: '/contact', component: Contact, name: 'Contact' },
  { path: '/products', component: ProductList, name: 'ProductList' },
  { path: '/product/:id', component: SingleProduct, name: 'SingleProduct' },
  { path: '/cart', component: Cart, name: 'Cart' },
  { path: '/checkout', component: Checkout, name: 'Checkout' },
  { path: '/orders', component: Orders, name: 'Orders' },
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/rating/:orderId', component: Rating, name: 'Rating' },

  // Admin
  { path: '/admin', component: AdminDashboard, name: 'AdminDashboard' },
  { path: '/admin/add-product', component: AddProduct, name: 'AddProduct' },
  { path: '/admin/edit-product/:id', component: EditProduct, name: 'EditProduct' },
  { path: '/admin/add-admin', component: AddAdmin, name: 'AddAdmin' },
  { path: '/admin/update-order', component: UpdateOrder, name: 'UpdateOrder' }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router