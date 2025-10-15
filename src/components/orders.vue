<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">⚡exporia</h1>
        <button @click="$router.back()" class="text-gray-600 hover:text-gray-800">✕</button>
      </div>
    </nav>

    <div class="container mx-auto px-6 py-12">
      <h1 class="text-4xl font-bold mb-8">Orders</h1>

      <div v-if="orders.length === 0" class="text-center py-12 text-gray-500">
        No orders found
      </div>

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">User</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Order</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Total Amount</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Order Status</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th v-if="isAdmin" class="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id" class="border-b hover:bg-gray-50">
              <td class="px-6 py-4 text-sm">{{ order._id.slice(-8) }}</td>
              <td class="px-6 py-4 text-sm">{{ order.user?.username || 'N/A' }}</td>
              <td class="px-6 py-4 text-sm">
                <div v-for="item in order.items" :key="item._id" class="mb-1">
                  {{ item.product?.name }} x{{ item.quantity }}
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-semibold">₱{{ order.total?.toFixed(2) }}</td>
              <td class="px-6 py-4">
                <span :class="getStatusClass(order.status)" 
                  class="px-3 py-1 rounded-full text-xs font-medium">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">{{ formatDate(order.createdAt) }}</td>
              <td v-if="isAdmin" class="px-6 py-4">
                <select @change="updateStatus(order._id, $event.target.value)" 
                  :value="order.status"
                  class="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
      isAdmin: false
    }
  },
  async created() {
    this.checkAdmin()
    await this.fetchOrders()
  },
  methods: {
    checkAdmin() {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      this.isAdmin = user.role === 'admin'
    },
    async fetchOrders() {
      try {
        const endpoint = this.isAdmin ? '/api/orders/all' : '/api/orders/user'
        const response = await fetch(`http://localhost:5000${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.orders = await response.json()
      } catch (err) {
        console.error(err)
      }
    },
    async updateStatus(orderId, status) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ status })
        })

        if (response.ok) {
          await this.fetchOrders()
        }
      } catch (err) {
        console.error(err)
      }
    },
    getStatusClass(status) {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>