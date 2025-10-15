<template>
  <div class="checkout-page">
    <nav class="navbar">
      <div class="nav-left">
        <router-link to="/landing" class="logo">
          <img src="images/logo.png" alt="Shoporia" />
        </router-link>
        <router-link to="/feature">Feature</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div class="nav-right">
        <router-link to="/orders" class="nav-icon">📦</router-link>
        <router-link to="/profile" class="nav-icon">👤</router-link>
        <router-link to="/cart" class="nav-icon">🛒</router-link>
      </div>
    </nav>

    <div class="checkout-container">
      <h1>Checkout</h1>
      
      <div class="checkout-content">
        <div class="checkout-form">
          <h2>Shipping Information</h2>
          <form @submit.prevent="processPayment">
            <div class="form-row">
              <div class="form-group">
                <label>First Name *</label>
                <input type="text" v-model="shippingInfo.firstName" required />
              </div>
              <div class="form-group">
                <label>Last Name *</label>
                <input type="text" v-model="shippingInfo.lastName" required />
              </div>
            </div>

            <div class="form-group">
              <label>Email Address *</label>
              <input 
                type="email" 
                v-model="shippingInfo.email" 
                required 
                @blur="validateEmail"
              />
              <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
            </div>

            <div class="form-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                v-model="shippingInfo.phone" 
                required 
                @input="validatePhone"
                placeholder="11-digit phone number"
              />
              <p v-if="errors.phone" class="error-msg">{{ errors.phone }}</p>
            </div>

            <div class="form-group">
              <label>Complete Address *</label>
              <input type="text" v-model="shippingInfo.address" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>City *</label>
                <input type="text" v-model="shippingInfo.city" required />
              </div>
              <div class="form-group">
                <label>Province *</label>
                <input type="text" v-model="shippingInfo.province" required />
              </div>
            </div>

            <div class="form-group">
              <label>Postal Code *</label>
              <input type="text" v-model="shippingInfo.postalCode" required />
            </div>

            <h3>Payment Method</h3>
            <div class="payment-methods">
              <label class="payment-option">
                <input type="radio" value="cod" v-model="paymentMethod" />
                <span>Cash on Delivery</span>
              </label>
              <label class="payment-option">
                <input type="radio" value="card" v-model="paymentMethod" />
                <span>Credit/Debit Card</span>
              </label>
              <label class="payment-option">
                <input type="radio" value="gcash" v-model="paymentMethod" />
                <span>GCash</span>
              </label>
            </div>

            <button type="submit" class="pay-btn">Pay Now</button>
          </form>
        </div>

        <div class="order-summary">
          <h2>Order Summary</h2>
          
          <div class="summary-items">
            <div v-for="item in checkoutData.items" :key="item.id" class="summary-item">
              <img :src="item.image" :alt="item.name" />
              <div class="item-info">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-qty">Qty: {{ item.quantity }}</p>
              </div>
              <p class="item-price">₱{{ (item.price * item.quantity).toLocaleString() }}</p>
            </div>
          </div>

          <div class="summary-totals">
            <div class="total-line">
              <span>Subtotal:</span>
              <span>₱{{ checkoutData.subtotal.toLocaleString() }}</span>
            </div>
            <div class="total-line">
              <span>Shipping:</span>
              <span>₱{{ checkoutData.shipping.toLocaleString() }}</span>
            </div>
            <div class="total-line" v-if="checkoutData.discount > 0">
              <span>Discount:</span>
              <span class="discount">-₱{{ checkoutData.discount.toLocaleString() }}</span>
            </div>
            <div class="total-line final-total">
              <span>Total:</span>
              <span>₱{{ checkoutData.total.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2024 Shoporia. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CheckoutView',
  data() {
    return {
      checkoutData: {
        items: [],
        subtotal: 0,
        shipping: 0,
        discount: 0,
        total: 0
      },
      shippingInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: ''
      },
      paymentMethod: 'cod',
      errors: {
        email: '',
        phone: ''
      }
    }
  },
  mounted() {
    const data = localStorage.getItem('checkoutData')
    if (data) {
      this.checkoutData = JSON.parse(data)
    } else {
      // If no checkout data, redirect to cart
      this.$router.push('/cart')
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.shippingInfo.email)) {
        this.errors.email = 'Invalid email format'
      } else {
        this.errors.email = ''
      }
    },
    validatePhone() {
      if (this.shippingInfo.phone.length !== 11) {
        this.errors.phone = 'Phone number must be exactly 11 digits'
      } else {
        this.errors.phone = ''
      }
    },
    processPayment() {
      this.validateEmail()
      this.validatePhone()
      
      if (this.errors.email || this.errors.phone) {
        alert('Please fix the errors before proceeding')
        return
      }
      
      // Create order
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const order = {
        id: Date.now(),
        userId: currentUser.email,
        items: this.checkoutData.items,
        shippingInfo: this.shippingInfo,
        paymentMethod: this.paymentMethod,
        subtotal: this.checkoutData.subtotal,
        shipping: this.checkoutData.shipping,
        discount: this.checkoutData.discount,
        total: this.checkoutData.total,
        status: 'Processing',
        date: new Date().toISOString()
      }
      
      // Save order
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))
      
      // Clear cart
      localStorage.removeItem('cart')
      localStorage.removeItem('checkoutData')
      
      // Redirect to orders page
      alert('Order placed successfully!')
      this.$router.push('/orders')
    }
  }
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f9f9f9;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.logo img {
  height: 40px;
}

.nav-left a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-right {
  display: flex;
  gap: 20px;
}

.nav-icon {
  font-size: 24px;
  text-decoration: none;
}

.checkout-container {
  padding: 50px;
  max-width: 1400px;
  margin: 0 auto;
}

.checkout-container h1 {
  font-size: 36px;
  margin-bottom: 40px;
  color: #333;
}

.checkout-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.checkout-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
}

.checkout-form h2 {
  margin-bottom: 30px;
  color: #333;
}

.checkout-form h3 {
  margin: 30px 0 20px;
  color: #333;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.error-msg {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.order-summary {
  background: white;
  padding: 30px;
  border-radius: 10px;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.order-summary h2 {
  margin-bottom: 25px;
  color: #333;
}

.summary-items {
  margin-bottom: 25px;
  max-height: 400px;
  overflow-y: auto;
}

.summary-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 15px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-name {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.item-qty {
  color: #666;
  font-size: 12px;
}

.item-price {
  font-weight: 600;
  color: #333;
}

.summary-totals {
  border-top: 2px solid #e0e0e0;
  padding-top: 20px;
}

.total-line {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  color: #666;
}

.total-line.final-total {
  border-top: 2px solid #333;
  margin-top: 10px;
  padding-top: 15px;
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.discount {
  color: green;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 30px;
  margin-top: 50px;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>