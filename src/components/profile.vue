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

    <!-- Profile Section -->
    <div class="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-center mb-8">PROFILE</h1>
        
        <div class="space-y-6">
          <!-- Profile Picture -->
          <div class="flex justify-center mb-8">
            <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <!-- User Information -->
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                <p class="text-lg font-medium">{{ user.firstName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                <p class="text-lg font-medium">{{ user.lastName }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
              <p class="text-lg font-medium">{{ user.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Contact Number</label>
              <p class="text-lg font-medium">{{ user.contactNumber }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                <p class="text-lg font-medium">{{ user.gender }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Birth Date</label>
                <p class="text-lg font-medium">{{ user.birthDate }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Address</label>
              <p class="text-lg font-medium">{{ user.address }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="pt-6 space-y-3">
            <button
              @click="editProfile"
              class="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              EDIT PROFILE
            </button>
            
            <button
              @click="handleLogout"
              class="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              LOG OUT
            </button>
          </div>
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
  name: 'Profile',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        gender: '',
        birthDate: '',
        address: ''
      }
    };
  },
  mounted() {
    this.loadUserProfile();
  },
  methods: {
    loadUserProfile() {
      // Load user data from session/localStorage or API
      // This should fetch the logged-in user's data
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      
      if (loggedInUser && loggedInUser.email) {
        this.user = {
          firstName: loggedInUser.firstName || 'John',
          lastName: loggedInUser.lastName || 'Doe',
          email: loggedInUser.email || 'john@example.com',
          contactNumber: loggedInUser.contactNumber || '09123456789',
          gender: loggedInUser.gender || 'Male',
          birthDate: loggedInUser.birthDate || 'MM/DD/YYYY',
          address: loggedInUser.address || '123 Main St, City'
        };
      } else {
        // If no user is logged in, redirect to login
        this.$router.push('/login');
      }
    },
    editProfile() {
      // Navigate to edit profile page or show edit form
      alert('Edit profile functionality - to be implemented');
    },
    handleLogout() {
      if (confirm('Are you sure you want to log out?')) {
        // Clear user session
        localStorage.removeItem('loggedInUser');
        sessionStorage.clear();
        
        // Redirect to login page
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>