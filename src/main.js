// src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router' // Renamed from index.js for clarity

Vue.config.productionTip = false

// Initialize default data if not exists (Keep the logic from your original main.js)
const defaultUsers = [
    {
      email: 'admin@store.com',
      password: 'admin123',
      role: 'admin',
      createdAt: '2024-01-01'
    },
    {
      email: 'user@store.com',
      password: 'user123',
      role: 'user',
      createdAt: '2024-01-01'
    }
];

const defaultProducts = [
    // Add 2-3 default products here for testing
    {
        id: '1',
        name: 'Classic Leather Tote',
        description: 'A timeless leather tote bag for everyday use.',
        price: 3500,
        stock: 10,
        category: 'bags',
        image: 'images/img.png',
        rating: 4.5,
        reviews: []
    },
    {
        id: '2',
        name: 'Sport Chrono Watch',
        description: 'Stainless steel watch with chronograph function.',
        price: 5200,
        stock: 5,
        category: 'watches',
        image: 'images/img.png',
        rating: 4.0,
        reviews: []
    }
];

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(defaultUsers));
}

if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(defaultProducts));
}

if (!localStorage.getItem('orders')) {
  localStorage.setItem('orders', JSON.stringify([]));
}

if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}

if (!localStorage.getItem('shipping')) {
  localStorage.setItem('shipping', JSON.stringify([]));
}

if (!localStorage.getItem('messages')) {
  const defaultMessages = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Great products! Fast delivery.',
      date: '2024-10-10'
    }
  ];
  localStorage.setItem('messages', JSON.stringify(defaultMessages));
}


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')