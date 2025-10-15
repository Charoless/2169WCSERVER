<template>
  <div class="min-h-screen bg-white">
    <nav class="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/" class="flex items-center">
              <img src="images/logo.png" alt="Shoporia" class="h-8">
            </router-link>
            <router-link to="/feature" class="text-gray-700 hover:text-gray-900 font-medium">Features</router-link>
            <router-link to="/products" class="text-gray-700 hover:text-gray-900 font-medium">Products</router-link>
            <router-link to="/contact" class="text-gray-700 hover:text-gray-900 font-medium">Contact</router-link>
          </div>
          <div class="flex items-center space-x-6">
            <router-link to="/orders" class="hover:opacity-75 transition-opacity">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-4-4v0a4 4 0 00-4 4v4m-1 7h10M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4m-16 0h16"></path></svg>
            </router-link>
            <router-link to="/profile" class="hover:opacity-75 transition-opacity">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </router-link>
            <router-link to="/cart" class="hover:opacity-75 transition-opacity">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="relative h-screen flex items-center justify-center pt-16"
             style="background-image: url('images/img.png'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-black/30"></div> 
      <div class="text-center z-10 text-white">
        <h1 class="text-6xl md:text-8xl font-serif mb-8 leading-tight tracking-wider">
          experience timeless elegance
        </h1>
        <router-link to="/products" 
                     class="text-xl font-medium uppercase border-2 border-white px-8 py-3 tracking-widest hover:bg-white hover:text-black transition duration-300">
          Discover
        </router-link>
      </div>

      <div class="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <footer class="bg-black text-white py-6 text-center">
      <p class="text-xl font-medium">Get Free Shipping on ₱2500+</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  // Your existing script content
};
</script>

<style scoped>
/* Keep your scoped styles here */
</style>