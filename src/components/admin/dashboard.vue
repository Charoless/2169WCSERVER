<template>
  <div class="dashboard-page">
    <div class="admin-header">
      <h1>Admin Dashboard</h1>
      <router-link to="/landing" class="back-btn">Back to Site</router-link>
    </div>

    <div class="dashboard-container">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Products</h3>
          <p class="stat-number">{{ totalProducts }}</p>
        </div>
        
        <div class="stat-card">
          <h3>Total Orders</h3>
          <p class="stat-number">{{ totalOrders }}</p>
        </div>
        
        <div class="stat-card">
          <h3>Total Revenue</h3>
          <p class="stat-number">₱{{ totalRevenue.toLocaleString() }}</p>
        </div>
        
        <div class="stat-card">
          <h3>Pending Orders</h3>
          <p class="stat-number">{{ pendingOrders }}</p>
        </div>
      </div>

      <div class="admin-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <router-link to="/admin/add-product" class="action-btn">
            ➕ Add New Product
          </router-link>
          <router-link to="/admin/add-admin" class="action-btn">
            👤 Add Admin
          </router-link>
          <router-link to="/admin/update-order" class="action-btn">
            📦 Update Orders
          </router-link>
        </div>
      </div>

      <div class="recent-orders">
        <h2>Recent Orders</h2>
        <div class="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id">
                <td>#{{ order.id }}</td>
                <td>{{ order.shippingInfo.firstName }} {{ order.shippingInfo.lastName }}</td>
                <td>₱{{ order.total.toLocaleString() }}</td>
                <td><span :class="'status-badge ' + order.status.toLowerCase()">{{ order.status }}</span></td>
                <td>{{ formatDate(order.date) }}</td>
                <td>
                  <router-link :to="`/admin/update-order?id=${order.id}`" class="edit-link">Edit</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="products-management">
        <h2>Products Management</h2>
        <div class="products-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td><img :src="product.image" :alt="product.name" class="product-thumb" /></td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>₱{{ product.price.toLocaleString() }}</td>
                <td>⭐ {{ product.rating }}</td>
                <td>
                  <router-link :to="`/admin/edit-product/${product.id}`" class="edit-link">Edit</router-link>
                  <button @click="deleteProduct(product.id)" class="delete-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      products: [],
      orders: [],
      recentOrders: []
    }
  },
  computed: {
    totalProducts() {
      return this.products.length
    },
    totalOrders() {
      return this.orders.length
    },
    totalRevenue() {
      return this.orders.reduce((sum, order) => sum + order.total, 0)
    },
    pendingOrders() {
      return this.orders.filter(o => o.status === 'Processing').length
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.products = JSON.parse(localStorage.getItem('products') || '[]')
      this.orders = JSON.parse(localStorage.getItem('orders') || '[]')
      this.recentOrders = this.orders.slice(-10).reverse()
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    deleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.products = this.products.filter(p => p.id !== id)
        localStorage.setItem('products', JSON.stringify(this.products))
        alert('Product deleted successfully!')
      }
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f9f9f9;
  padding: 30px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.admin-header h1 {
  font-size: 36px;
  color: #333;
}

.back-btn {
  padding: 12px 30px;
  background: #333;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  color: #666;
  font-size: 16px;
  margin-bottom: 15px;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #333;
}

.admin-actions {
  background: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.admin-actions h2 {
  margin-bottom: 20px;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 15px 30px;
  background: #333;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #000;
}

.recent-orders, .products-management {
  background: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.recent-orders h2, .products-management h2 {
  margin-bottom: 25px;
  color: #333;
}

.orders-table, .products-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f9f9f9;
}

th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.product-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.status-badge {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.processing {
  background: #fff3cd;
  color: #856404;
}

.status-badge.shipped {
  background: #cce5ff;
  color: #004085;
}

.status-badge.delivered {
  background: #d4edda;
  color: #155724;
}

.edit-link {
  color: #007bff;
  text-decoration: none;
  margin-right: 15px;
  font-weight: 600;
}

.edit-link:hover {
  text-decoration: underline;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
}

.delete-btn:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>