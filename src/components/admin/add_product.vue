<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Admin Panel</h1>
        <button @click="$router.push('/admin')" class="text-gray-600 hover:text-gray-800">✕</button>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold mb-8">Add New Product</h2>
      
      <form @submit.prevent="addProduct" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input v-model="form.name" type="text" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea v-model="form.description" rows="4" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price (₱)</label>
            <input v-model.number="form.price" type="number" required min="0.01" step="0.01"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input v-model.number="form.stock" type="number" required min="0"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select v-model="form.category" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>Select a category</option>
                <option value="bags">Bags</option>
                <option value="watches">Watches</option>
                <option value="wallets">Wallets</option>
                <option value="perfume">Perfume</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Image (URL or Base64)</label>
          <input type="text" v-model="form.image" placeholder="Enter image URL or 'images/img.png'"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <p class="text-xs text-gray-500 mt-1">For testing, use 'images/img.png' as per instruction.</p>
          <div v-if="form.image" class="mt-4">
            <img :src="form.image" alt="Preview" class="h-32 w-32 object-cover rounded">
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button type="button" @click="cancel"
                  class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit"
                  class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Add Product
          </button>
        </div>
      </form>

      <div v-if="successMessage" class="mt-6 p-4 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
      form: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: 'images/img.png' // Default image as requested
      },
      successMessage: ''
    }
  },
  methods: {
    addProduct() {
      // Basic validation
      if (!this.form.name || !this.form.description || this.form.price <= 0 || this.form.stock < 0 || !this.form.category) {
        alert('Please fill out all fields correctly.');
        return;
      }
      
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const newProduct = {
        id: Date.now().toString(),
        ...this.form,
        price: parseFloat(this.form.price),
        stock: parseInt(this.form.stock),
        rating: 0,
        reviews: []
      };
      
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
      
      this.successMessage = 'Product added successfully!';
      
      // Clear form after successful addition
      this.form = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: 'images/img.png'
      };
      
      setTimeout(() => {
        this.successMessage = '';
        this.$router.push('/admin'); // Vue 2 Router navigation
      }, 1500);
    },
    cancel() {
      this.$router.push('/admin');
    }
  }
}
</script>

<style scoped>
/* Keep your scoped styles here */
</style>