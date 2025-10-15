<template>
  <div class="min-h-screen flex">
    <div class="hidden md:block md:w-1/2 bg-cover bg-center relative" 
         style="background-image: url('images/img.png');"> <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <div class="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-2">⚡exporia</h1>
        </div>

        <div class="bg-white rounded-lg p-8">
          <h2 class="text-4xl font-bold text-center mb-8">Login</h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div v-if="loginError" class="bg-red-100 text-red-700 p-3 rounded text-sm text-center">{{ loginError }}</div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input v-model="form.email" type="email" required 
                class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition">
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Password</label>
              <input v-model="form.password" type="password" required 
                class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition">
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center text-sm text-gray-600">
                <input type="checkbox" v-model="isAdmin" class="mr-2">
                Login as Admin
              </label>
            </div>

            <button type="submit" 
              class="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition">
              Login
            </button>

            <p class="text-center text-sm text-gray-600">
              Don't have an account yet? 
              <router-link to="/signup" class="text-black font-medium hover:underline">Sign up here</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '', // Changed from username to email for consistency
        password: ''
      },
      isAdmin: false,
      loginError: ''
    }
  },
  methods: {
    submitForm() {
      this.loginError = ''; // Clear previous error

      // Simulate fetching users from database (local storage)
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find(u => u.email === this.form.email && u.password === this.form.password);

      if (user) {
        if (this.isAdmin && user.role !== 'admin') {
          this.loginError = 'Wrong email or password.';
        } else if (!this.isAdmin && user.role === 'admin') {
          this.loginError = 'Wrong email or password.';
        } else {
          // Success: Set logged in user/token (simulated)
          localStorage.setItem('token', 'simulated_jwt_token');
          localStorage.setItem('loggedInUser', JSON.stringify(user));

          if (user.role === 'admin') {
            alert('Admin login successful!');
            this.$router.push('/admin'); // Redirect to Admin Dashboard
          } else {
            alert('User login successful!');
            this.$router.push('/'); // Redirect to Landing Page
          }
        }
      } else {
        this.loginError = 'Wrong email or password.';
      }
    }
  }
}
</script>

<style scoped>
/* Keep your scoped styles here */
</style>