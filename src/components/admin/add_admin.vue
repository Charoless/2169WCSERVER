<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">⚡exporia</h1>
        <button @click="$router.push('/dashboard')" class="text-gray-600 hover:text-gray-800">✕</button>
      </div>
    </nav>

    <div class="max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold mb-8">Add Admin</h2>
      
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2">First Name</label>
            <input v-model="form.firstName" type="text" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Birth Date</label>
            <input v-model="form.birthDate" type="date" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2">Last Name</label>
            <input v-model="form.lastName" type="text" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Username</label>
            <input v-model="form.username" type="text" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2">Gender</label>
            <select v-model="form.gender" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Password</label>
            <input v-model="form.password" type="password" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Contact Number</label>
          <input v-model="form.contactNumber" type="tel" required 
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Email Address</label>
          <input v-model="form.email" type="email" required 
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
        </div>

        <button type="submit" 
          class="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition">
          Add Admin
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddAdmin',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        birthDate: '',
        username: '',
        gender: '',
        password: '',
        contactNumber: '',
        email: ''
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:5000/api/admin/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.form)
        })

        if (response.ok) {
          alert('Admin added successfully!')
          this.$router.push('/dashboard')
        } else {
          const data = await response.json()
          alert(data.message || 'Failed to add admin')
        }
      } catch (err) {
        console.error(err)
        alert('Error adding admin')
      }
    }
  }
}
</script>