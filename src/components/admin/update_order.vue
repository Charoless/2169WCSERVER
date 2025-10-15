<template>
  <div class="update-order-page">
    <div class="admin-header">
      <h1>Update Order Status</h1>
      <router-link to="/admin/dashboard" class="back-btn">Back to Dashboard</router-link>
    </div>

    <div class="update-order-container">
      <div class="orders-list">
        <h2>All Orders</h2>
        
        <div v-if="orders.length === 0" class="no-orders">
          <p>No orders found</p>
        </div>

        <div v-else class="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Total</th>
                <th>Current Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>#{{ order.id }}</td>
                <td>{{ order.shippingInfo.firstName }} {{ order.shippingInfo.lastName }}</td>
                <td>{{ order.shippingInfo.email }}</td>
                <td>₱{{ order.total.toLocaleString() }}</td>
                <td>
                  <span :class="'status-badge ' + order.status.toLowerCase()">
                    {{ order.status }}
                  </span>
                </td>
                <td>{{ formatDate(order.date) }}</td>
                <td>
                  <button @click="openUpdateModal(order)" class="update-btn">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Update Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Update Order #{{ selectedOrder.id }}</h3>
        
        <div class="order-details">
          <p><strong>Customer:</strong> {{ selectedOrder.shippingInfo.firstName }} {{ selectedOrder.shippingInfo.lastName }}</p>
          <p><strong>Email:</strong> {{ selectedOrder.shippingInfo.email }}</p>
          <p><strong>Phone:</strong> {{ selectedOrder.shippingInfo.phone }}</p>
          <p><strong>Address:</strong> {{ selectedOrder.shippingInfo.address }}, {{ selectedOrder.shippingInfo.city }}, {{ selectedOrder.shippingInfo.province }}</p>
          <p><strong>Payment Method:</strong> {{ selectedOrder.paymentMethod }}</p>
          <p><strong>Total Amount:</strong> ₱{{ selectedOrder.total.toLocaleString() }}</p>
        </div>

        <div class="status-update">
          <label>Update Status:</label>
          <select v-model="newStatus">
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div class="modal-actions">
          <button @click="updateOrderStatus" class="btn-save">Save Changes</button>
          <button @click="closeModal" class="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateOrderView',
  data() {
    return {
      orders: [],
      showModal: false,
      selectedOrder: null,
      newStatus: ''
    }
  },
  mounted() {
    this.loadOrders()
    
    // Check if coming from dashboard with order ID
    const orderId = this.$route.query.id
    if (orderId) {
      const order = this.orders.find(o => o.id == orderId)
      if (order) {
        this.openUpdateModal(order)
      }
    }
  },
  methods: {
    loadOrders() {
      this.orders = JSON.parse(localStorage.getItem('orders') || '[]')
      this.orders.sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    openUpdateModal(order) {
      this.selectedOrder = order
      this.newStatus = order.status
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedOrder = null
      this.newStatus = ''
    },
    updateOrderStatus() {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const index = orders.findIndex(o => o.id === this.selectedOrder.id)
      
      if (index !== -1) {
        orders[index].status = this.newStatus
        localStorage.setItem('orders', JSON.stringify(orders))
        
        alert('Order status updated successfully!')
        this.loadOrders()
        this.closeModal()
      }
    }
  }
}
</script>

<style scoped>
.update-order-page {
  min-height: 100vh;
  background: #f9f9f9;
  padding: 30px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
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
  transition: background 0.3s;
}

.back-btn:hover {
  background: #000;
}

.update-order-container {
  max-width: 1400px;
  margin: 0 auto;
}

.orders-list {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.orders-list h2 {
  margin-bottom: 25px;
  color: #333;
}

.no-orders {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.orders-table {
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

.status-badge {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
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

.status-badge.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.update-btn {
  padding: 8px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.update-btn:hover {
  background: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 25px;
  color: #333;
  font-size: 24px;
}

.order-details {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 25px;
}

.order-details p {
  margin-bottom: 10px;
  color: #666;
  line-height: 1.6;
}

.order-details strong {
  color: #333;
}

.status-update {
  margin-bottom: 25px;
}

.status-update label {
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

.status-update select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  gap: 15px;
}

.btn-save,
.btn-cancel {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-save {
  background: #28a745;
  color: white;
}

.btn-save:hover {
  background: #218838;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  
  .orders-table {
    font-size: 12px;
  }
  
  th, td {
    padding: 10px 5px;
  }
  
  .modal-content {
    padding: 20px;
  }
}
</style>