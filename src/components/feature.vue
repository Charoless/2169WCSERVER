<template>
  <div class="feature-page">
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

    <div class="hero-banner">
      <div class="hero-overlay">
        <h1>WE OFFER<br/>VARIOUS<br/>LUXURY ITEMS</h1>
        <router-link to="/products" class="discover-btn">Discover</router-link>
      </div>
    </div>

    <div class="collections-section">
      <h2>Our Collections</h2>
      <div class="collections-grid">
        <div class="collection-item" @click="goToCategory('bags')">
          <img src="images/img.png" alt="Bags" />
          <h3>Bags</h3>
        </div>
        <div class="collection-item" @click="goToCategory('wallet')">
          <img src="images/img.png" alt="Wallet" />
          <h3>Wallet</h3>
        </div>
        <div class="collection-item" @click="goToCategory('watches')">
          <img src="images/img.png" alt="Watches" />
          <h3>Watches</h3>
        </div>
        <div class="collection-item" @click="goToCategory('perfume')">
          <img src="images/img.png" alt="Perfume" />
          <h3>Perfume</h3>
        </div>
      </div>
    </div>

    <div class="reviews-section">
      <h2>Customer Reviews</h2>
      <div class="reviews-container">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-rating">⭐ {{ review.rating }}/5</div>
          <p class="review-text">{{ review.text }}</p>
          <p class="review-author">- {{ review.author }}</p>
        </div>
      </div>
      
      <div class="add-review">
        <h3>Write a Review</h3>
        <form @submit.prevent="submitReview">
          <div class="rating-input">
            <label>Rating:</label>
            <select v-model="newReview.rating" required>
              <option value="">Select Rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Below Average</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <textarea 
            v-model="newReview.text" 
            placeholder="Share your experience..."
            required
          ></textarea>
          <button type="submit" class="submit-review-btn">Submit Review</button>
        </form>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2024 Shoporia. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FeatureView',
  data() {
    return {
      reviews: [],
      newReview: {
        rating: '',
        text: ''
      }
    }
  },
  mounted() {
    this.loadReviews()
  },
  methods: {
    goToCategory(category) {
      this.$router.push({ name: 'products', query: { category } })
    },
    loadReviews() {
      const stored = localStorage.getItem('customerReviews')
      this.reviews = stored ? JSON.parse(stored) : []
    },
    submitReview() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const review = {
        id: Date.now(),
        rating: this.newReview.rating,
        text: this.newReview.text,
        author: currentUser.name || 'Anonymous',
        date: new Date().toLocaleDateString()
      }
      
      this.reviews.push(review)
      localStorage.setItem('customerReviews', JSON.stringify(this.reviews))
      
      this.newReview = { rating: '', text: '' }
    }
  }
}
</script>

<style scoped>
.feature-page {
  min-height: 100vh;
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

.hero-banner {
  height: 500px;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('@/assets/images/img.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  text-align: center;
  color: white;
}

.hero-overlay h1 {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
}

.discover-btn {
  display: inline-block;
  padding: 15px 50px;
  background: white;
  color: #333;
  text-decoration: none;
  font-weight: 600;
  border-radius: 5px;
}

.collections-section {
  padding: 80px 50px;
  text-align: center;
}

.collections-section h2 {
  font-size: 36px;
  margin-bottom: 50px;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.collection-item {
  cursor: pointer;
  transition: transform 0.3s;
}

.collection-item:hover {
  transform: translateY(-10px);
}

.collection-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.collection-item h3 {
  margin-top: 15px;
  font-size: 24px;
}

.reviews-section {
  padding: 80px 50px;
  background: #f9f9f9;
}

.reviews-section h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
}

.reviews-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.review-author {
  font-weight: 600;
  color: #333;
}

.add-review {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.add-review h3 {
  margin-bottom: 20px;
  font-size: 24px;
}

.rating-input {
  margin-bottom: 20px;
}

.rating-input label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.rating-input select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
}

.submit-review-btn {
  margin-top: 20px;
  padding: 12px 40px;
  background: #333;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.submit-review-btn:hover {
  background: #000;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 30px;
}

@media (max-width: 768px) {
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.review-rating {
  color: #ffa500;
  font-weight: 600;
  margin-bottom: 15px;
}

.review-text {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.review-<template>
  <div class="feature-page">
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

    <div class="hero-banner">
      <div class="hero-overlay">
        <h1>WE OFFER<br/>VARIOUS<br/>LUXURY ITEMS</h1>
        <router-link to="/products" class="discover-btn">Discover</router-link>
      </div>
    </div>

    <div class="collections-section">
      <h2>Our Collections</h2>
      <div class="collections-grid">
        <div class="collection-item" @click="goToCategory('bags')">
          <img src="@/assets/images/img.png" alt="Bags" />
          <h3>Bags</h3>
        </div>
        <div class="collection-item" @click="goToCategory('wallet')">
          <img src="@/assets/images/img.png" alt="Wallet" />
          <h3>Wallet</h3>
        </div>
        <div class="collection-item" @click="goToCategory('watches')">
          <img src="@/assets/images/img.png" alt="Watches" />
          <h3>Watches</h3>
        </div>
        <div class="collection-item" @click="goToCategory('perfume')">
          <img src="@/assets/images/img.png" alt="Perfume" />
          <h3>Perfume</h3>
        </div>
      </div>
    </div>

    <div class="reviews-section">
      <h2>Customer Reviews</h2>
      <div class="reviews-container">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-rating">⭐ {{ review.rating }}/5</div>
          <p class="review-text">{{ review.text }}</p>
          <p class="review-author">- {{ review.author }}</p>
        </div>
      </div>
      
      <div class="add-review">
        <h3>Write a Review</h3>
        <form @submit.prevent="submitReview">
          <div class="rating-input">
            <label>Rating:</label>
            <select v-model="newReview.rating" required>
              <option value="">Select Rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Below Average</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <textarea 
            v-model="newReview.text" 
            placeholder="Share your experience..."
            required
          ></textarea>
          <button type="submit" class="submit-review-btn">Submit Review</button>
        </form>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2024 Shoporia. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FeatureView',
  data() {
    return {
      reviews: [],
      newReview: {
        rating: '',
        text: ''
      }
    }
  },
  mounted() {
    this.loadReviews()
  },
  methods: {
    goToCategory(category) {
      this.$router.push({ name: 'products', query: { category } })
    },
    loadReviews() {
      const stored = localStorage.getItem('customerReviews')
      this.reviews = stored ? JSON.parse(stored) : []
    },
    submitReview() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const review = {
        id: Date.now(),
        rating: this.newReview.rating,
        text: this.newReview.text,
        author: currentUser.name || 'Anonymous',
        date: new Date().toLocaleDateString()
      }
      
      this.reviews.push(review)
      localStorage.setItem('customerReviews', JSON.stringify(this.reviews))
      
      this.newReview = { rating: '', text: '' }
    }
  }
}
</script>

<style scoped>
.feature-page {
  min-height: 100vh;
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

.hero-banner {
  height: 500px;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('@/assets/images/img.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  text-align: center;
  color: white;
}

.hero-overlay h1 {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
}

.discover-btn {
  display: inline-block;
  padding: 15px 50px;
  background: white;
  color: #333;
  text-decoration: none;
  font-weight: 600;
  border-radius: 5px;
}

.collections-section {
  padding: 80px 50px;
  text-align: center;
}

.collections-section h2 {
  font-size: 36px;
  margin-bottom: 50px;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.collection-item {
  cursor: pointer;
  transition: transform 0.3s;
}

.collection-item:hover {
  transform: translateY(-10px);
}

.collection-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.collection-item h3 {
  margin-top: 15px;
  font-size: 24px;
}

.reviews-section {
  padding: 80px 50px;
  background: #f9f9f9;
}

.reviews-section h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
}

.reviews-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.review-author {
  font-weight: 600;
  color: #333;
}

.add-review {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.add-review h3 {
  margin-bottom: 20px;
  font-size: 24px;
}

.rating-input {
  margin-bottom: 20px;
}

.rating-input label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.rating-input select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
}

.submit-review-btn {
  margin-top: 20px;
  padding: 12px 40px;
  background: #333;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.submit-review-btn:hover {
  background: #000;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 30px;
}

@media (max-width: 768px) {
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.review-rating {
  color: #ffa500;
  font-weight: 600;
  margin-bottom: 15px;
}

.review-text {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.review-