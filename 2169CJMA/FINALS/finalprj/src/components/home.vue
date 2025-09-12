<template>
  <div class="home">
    <div class="hero">
      <h1>{{ msg }}</h1>
      <p class="tagline">Where every sip and every bite brings comfort and joy.</p>
      <router-link class="cta-button" :to="{ name: 'about' }">Learn More</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Brew & Bliss'
    }
  }
}
</script>

<style scoped>
.home {
  padding: 4rem 2rem;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom right, #fffdf7, #f3f3f3);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  animation: fadeIn 0.8s ease-in-out;
}

.hero {
  text-align: center;
  max-width: 700px;
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 2.8rem;
  color: #6f4e37;
  margin-bottom: 1rem;
}

.tagline {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #a0522d;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #8b4513;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
