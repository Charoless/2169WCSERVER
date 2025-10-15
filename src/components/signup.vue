<template>
  <div class="signup-container">
    <div class="signup-box">
      <h1>Signup</h1>
      <form @submit.prevent="handleSignup">
        
        <div class="form-group">
          <label>Name *</label>
          <input type="text" v-model="formData.name" required placeholder="Enter your name" />
        </div>
        
        <div class="form-group">
          <label>Email *</label>
          <input type="email" v-model="formData.email" required placeholder="Enter your email" @input="validateEmail" />
          <p v-if="errors.email" class="error-msg text-red-600 text-sm mt-1">{{ errors.email }}</p>
        </div>
        
        <div class="form-group">
          <label>Contact Number *</label>
          <input type="text" v-model="formData.contact" required placeholder="Enter 11-digit contact number" @input="validateContact" />
          <p v-if="errors.contact" class="error-msg text-red-600 text-sm mt-1">{{ errors.contact }}</p>
        </div>
        
        <div class="form-group">
          <label>Address *</label>
          <input type="text" v-model="formData.address" required placeholder="Your address" />
        </div>

        <div class="form-group">
          <label>Password *</label>
          <input type="password" v-model="formData.password" required placeholder="Min 8 chars, 1 special char" @input="validatePassword" />
          <p v-if="errors.password" class="error-msg text-red-600 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <div class="button-group">
          <button type="submit" :disabled="!isFormValid" class="submit-btn">Signup</button>
          <button type="button" @click="resetForm" class="reset-btn">Reset</button>
        </div>

        <p class="login-link">
          Already have an account? <router-link to="/login">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        contact: '',
        address: '',
        password: ''
      },
      errors: {
        email: '',
        contact: '',
        password: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return !this.errors.email && !this.errors.contact && !this.errors.password && 
             this.formData.name && this.formData.email && this.formData.contact && 
             this.formData.address && this.formData.password;
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.errors.email = emailRegex.test(this.formData.email) ? '' : 'Invalid email format.';
    },
    validateContact() {
      const contact = this.formData.contact.replace(/\D/g, ''); // Remove non-digits
      this.formData.contact = contact.slice(0, 11); // Limit to 11 digits

      if (contact.length !== 11) {
        this.errors.contact = 'Contact number must be exactly 11 digits.';
      } else {
        this.errors.contact = '';
      }
    },
    validatePassword() {
      const password = this.formData.password;
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      
      if (password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters.';
      } else if (!specialCharRegex.test(password)) {
        this.errors.password = 'Password must contain at least one special character.';
      } else if (password.length > 8) {
        // You specified "limited to 8 characters" - this is an unusual security practice, 
        // but implemented here. Typically, it's minimum 8.
        this.formData.password = password.slice(0, 8); 
        this.errors.password = '';
      } else {
        this.errors.password = '';
      }
    },
    handleSignup() {
      // Final form validation check
      if (!this.isFormValid) {
        alert('Please fix the errors and fill all required fields.');
        return;
      }

      // Add user to local storage for MEVN simulation
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        ...this.formData,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      // Check for existing user (simple email check)
      if (users.some(user => user.email === newUser.email)) {
        alert('Registration failed: Email already exists.');
        return;
      }

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      alert('Registration successful! Redirecting to login.');
      this.$router.push('/login');
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        contact: '',
        address: '',
        password: ''
      };
      this.errors = {
        email: '',
        contact: '',
        password: ''
      };
    }
  }
}
</script>

<style scoped>
/* Keep your scoped styles here */
.signup-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('@/assets/images/img.png'); /* Fix path */
  background-size: cover;
  background-position: center;
}
.signup-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 90%;
  max-width: 400px;
}
/* ... rest of your styles */
.submit-btn {
  /* ... your styles */
  background: black;
  color: white;
}
.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.reset-btn {
  /* ... your styles */
  background: gray;
  color: white;
}
.button-group {
    display: flex;
    gap: 10px;
}
</style>