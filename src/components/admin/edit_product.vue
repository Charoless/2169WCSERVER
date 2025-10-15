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

    <!-- Edit Product Form -->
    <div class="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-center mb-8">EDIT PRODUCT</h1>
        
        <form @submit.prevent="handleSubmit">
          <div class="space-y-6">
            <!-- Product Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                v-model="product.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter product name"
              >
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                v-model="product.category"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="bags">Bags</option>
                <option value="wallets">Wallets</option>
                <option value="watches">Watches</option>
                <option value="perfumes">Perfumes</option>
              </select>
            </div>

            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                v-model.number="product.price"
                type="number"
                step="0.01"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="0.00"
              >
            </div>

            <!-- Stock -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                v-model.number="product.stock"
                type="number"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter stock quantity"
              >
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                v-model="product.description"
                required
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter product description"
              ></textarea>
            </div>

            <!-- Image URL -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <input
                v-model="product.image"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="images/img.png"
              >
              <p class="mt-1 text-sm text-gray-500">Use format: images/img.png</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-4">
              <button
                type="submit"
                class="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                UPDATE
              </button>
              <button
                type="button"
                @click="handleDelete"
                class="flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                DELETE
              </button>
            </div>
            
            <button
              type="button"
              @click="$router.push('/admin')"
              class="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              CANCEL
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p class="text-green-800 text-center">{{ successMessage }}</p>
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
  name: 'EditProduct',
  data() {
    return {
      product: {
        id: '',
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        image: ''
      },
      showSuccess: false,
      successMessage: ''
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    this.loadProduct(productId);
  },
  methods: {
    async loadProduct(id) {
      try {
        // API call to fetch product from backend/database
        console.log('Loading product:', id);
        
        // Simulated product data - replace with actual API call
        this.product = {
          id: id,
          name: 'Leather Bag',
          category: 'bags',
          price: 2499.99,
          stock: 10,
          description: 'Premium leather bag',
          image: 'images/img.png'
        };
      } catch (error) {
        console.error('Error loading product:', error);
        alert('Failed to load product data.');
      }
    },
    async handleSubmit() {
      try {
        // API call to update product in backend/database
        console.log('Updating product:', this.product);
        
        this.successMessage = 'Product updated successfully!';
        this.showSuccess = true;
        
        setTimeout(() => {
          this.showSuccess = false;
          this.$router.push('/admin');
        }, 2000);
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
      }
    },
    async handleDelete() {
      if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        try {
          // API call to delete product from backend/database
          console.log('Deleting product:', this.product.id);
          
          this.successMessage = 'Product deleted successfully!';
          this.showSuccess = true;
          
          setTimeout(() => {
            this.showSuccess = false;
            this.$router.push('/admin');
          }, 2000);
        } catch (error) {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again.');
        }
      }
    }
  }
};
</script>

<style scoped>
input:focus, select:focus, textarea:focus {
  outline: none;
}
</style>