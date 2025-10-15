<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/landing" class="flex items-center">
              <img src="images/logo.png" alt="Shoporia" class="h-8">
            </router-link>
            <router-link to="/features" class="text-gray-700 hover:text-gray-900">Features</router-link>
            <router-link to="/products" class="text-gray-700 hover:text-gray-900">Products</router-link>
            <router-link to="/contact" class="text-gray-700 hover:text-gray-900">Contact</router-link>
          </div>
          <div class="flex items-center space-x-6">
            <router-link to="/orders">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </router-link>
            <router-link to="/profile">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </router-link>
            <router-link to="/cart">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Product Details -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="bg-gray-200 rounded-lg overflow-hidden aspect-square">
          <img 
            :src="product.image" 
            :alt="product.name"
            class="w-full h-full object-cover"
          >
        </div>

        <!-- Product Information -->
        <div class="flex flex-col">
          <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
          
          <!-- Rating -->
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <span v-for="star in 5" :key="`star-${star}`">
                <svg 
                  class="w-5 h-5" 
                  :class="star <= Math.round(product.averageRating) ? 'fill-current' : 'fill-gray-300'"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </span>
            </div>
            <span class="ml-2 text-gray-600">({{ product.reviewCount }} reviews)</span>
          </div>

          <!-- Price -->
          <p class="text-3xl font-bold mb-6">₱{{ formatPrice(product.price) }}</p>

          <!-- Description -->
          <div class="mb-8">
            <h3 class="font-semibold text-lg mb-2">Description</h3>
            <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Stock Status -->
          <div class="mb-6">
            <p class="text-sm font-medium" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
              {{ product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
            </p>
          </div>

          <!-- Quantity Selector -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div class="flex items-center space-x-3">
              <button 
                @click="decreaseQuantity"
                class="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="quantity <= 1"
              >
                -
              </button>
              <input 
                v-model.number="quantity"
                type="number"
                min="1"
                :max="product.stock"
                class="w-20 text-center border border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                @input="validateQuantity"
              >
              <button 
                @click="increaseQuantity"
                class="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="quantity >= product.stock"
              >
                +
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 mb-8">
            <button 
              @click="addToCart"
              :disabled="product.stock === 0"
              class="flex-1 bg-white border-2 border-black text-black py-3 px-6 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ADD TO CART
            </button>
            <button 
              @click="buyNow"
              :disabled="product.stock === 0"
              class="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      <!-- Product Reviews Section -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        <!-- Review List -->
        <div v-if="reviews.length > 0" class="space-y-4 mb-8">
          <div 
            v-for="review in reviews" 
            :key="review.id"
            class="bg-white p-6 rounded-lg shadow-sm"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <span class="font-semibold mr-2">{{ review.userName }}</span>
                <div class="flex text-yellow-400">
                  <span v-for="star in 5" :key="`review-star-${review.id}-${star}`">
                    <svg 
                      class="w-4 h-4" 
                      :class="star <= review.rating ? 'fill-current' : 'fill-gray-300'"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </span>
                </div>
              </div>
              <span class="text-sm text-gray-500">{{ review.date }}</span>
            </div>
            <p class="text-gray-700">{{ review.comment }}</p>
          </div>
        </div>

        <!-- No Reviews Message -->
        <div v-else class="text-center py-8 text-gray-500 bg-white rounded-lg">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-black text-white py-12 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-bold text-lg mb-4">FIND</h3>
            <ul class="space-y-2 text-gray-300">
              <li>EVERYDAY</li>
              <li>LUXURY</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Company</h3>
            <ul class="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Our Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Help & Support</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Shipping Info</li>
              <li>Returns</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Follow Us</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'SingleProduct',
  data() {
    return {
      product: {
        id: '',
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: '',
        image: '',
        averageRating: 0,
        reviewCount: 0
      },
      quantity: 1,
      reviews: []
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    this.loadProduct(productId);
    this.loadReviews(productId);
  },
  methods: {
    async loadProduct(id) {
      try {
        // Fetch product from database/API
        // Replace this with actual API call
        // Example: const response = await fetch(`/api/products/${id}`);
        // this.product = await response.json();
        
        this.product = {
          id: id,
          name: 'Leather Bag',
          category: 'bags',
          price: 2499.99,
          stock: 10,
          description: 'Premium quality leather bag with multiple compartments. Perfect for everyday use and special occasions. Made with genuine leather and high-quality hardware.',
          image: 'images/img.png',
          averageRating: 4.5,
          reviewCount: 12
        };
      } catch (error) {
        console.error('Error loading product:', error);
        alert('Failed to load product. Please try again.');
      }
    },
    async loadReviews(productId) {
      try {
        // Fetch reviews from database - filter by productId
        // Replace this with actual API call
        // Example: const response = await fetch(`/api/reviews?productId=${productId}`);
        // this.reviews = await response.json();
        
        this.reviews = [
          {
            id: 1,
            productId: productId,
            userName: 'Maria Santos',
            rating: 5,
            comment: 'Excellent quality! Worth every peso.',
            date: '2025-10-10'
          },
          {
            id: 2,
            productId: productId,
            userName: 'Juan Dela Cruz',
            rating: 4,
            comment: 'Great product, fast delivery.',
            date: '2025-10-08'
          }
        ];
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    },
    formatPrice(price) {
      return price.toFixed(2);
    },
    validateQuantity() {
      // Ensure quantity stays within valid range
      if (this.quantity < 1) {
        this.quantity = 1;
      } else if (this.quantity > this.product.stock) {
        this.quantity = this.product.stock;
      }
    },
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      if (this.product.stock === 0) {
        alert('This product is out of stock.');
        return;
      }

      // Add product to cart
      const cartItem = {
        productId: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        image: this.product.image
      };

      // Get existing cart or create new one
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if product already in cart
      const existingIndex = cart.findIndex(item => item.productId === cartItem.productId);
      
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += this.quantity;
      } else {
        cart.push(cartItem);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
      
      // Redirect to cart
      this.$router.push('/cart');
    },
    buyNow() {
      if (this.product.stock === 0) {
        alert('This product is out of stock.');
        return;
      }

      // Add product to cart
      const cartItem = {
        productId: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        image: this.product.image
      };

      // Get existing cart or create new one
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if product already in cart
      const existingIndex = cart.findIndex(item => item.productId === cartItem.productId);
      
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += this.quantity;
      } else {
        cart.push(cartItem);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Redirect directly to checkout
      this.$router.push('/checkout');
    }
  }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield; /* optional fallback */
}


input:focus {
  outline: none;
}
</style>