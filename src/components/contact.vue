<template>
  <div class="contact-page">
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

    <div class="contact-container">
      <h1>Contact Us</h1>
      <div class="contact-content">
        <div class="contact-form">
          <h2>Send us a message</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" v-model="form.name" required placeholder="Your name" />
            </div>
            
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" v-model="form.email" required placeholder="your.email@example.com" />
            </div>
            
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" v-model="form.phone" required placeholder="09XXXXXXXXX" />
            </div>
            
            <div class="form-group">
              <label>Subject</label>
              <input type="text" v-model="form.subject" required placeholder="What is this about?" />
            </div>
            
            <div class="form-group">
              <label>Message</label>
              <textarea v-model="form.message" required placeholder="Your message here..."></textarea>
            </div>
            
            <button type="submit" class="submit-btn">Send Message</button>
          </form>
        </div>
        
        <div class="contact-info">
          <h2>Get in Touch</h2>
          <div class="info-item">
            <h3>📍 Address</h3>
            <p>123 Luxury Street, Fashion District<br/>Manila, Philippines 1000</p>
          </div>
          
          <div class="info-item">
            <h3>📞 Phone</h3>
            <p>+63 912 345 6789</p>
          </div>
          
          <div class="info-item">
            <h3>📧 Email</h3>
            <p>support@shoporia.com</p>
          </div>
          
          <div class="info-item">
            <h3>🕐 Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed</p>
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
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Save contact message
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
      messages.push({
        ...this.form,
        date: new Date().toISOString()
      })
      localStorage.setItem('contactMessages', JSON.stringify(messages))
      
      alert('Thank you for contacting us! We will get back to you soon.')
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact-page {
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

.contact-container {
  padding: 50px;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-container h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 50px;
  color: #333;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.contact-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.contact-form h2 {
  margin-bottom: 30px;
  color: #333;
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: #333;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #000;
}

.contact-info {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.contact-info h2 {
  margin-bottom: 30px;
  color: #333;
}

.info-item {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item h3 {
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
}

.info-item p {
  color: #666;
  line-height: 1.6;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 30px;
  margin-top: 50px;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>