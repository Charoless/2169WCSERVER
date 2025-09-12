<template>
  <div class="contact">
    <h1>{{ title }}</h1>
    <p class="intro">
      We’d love to hear from you! Whether it’s feedback, catering inquiries, or just a coffee chat—reach out anytime.
    </p>
    <div class="info-card">
      <ul>
        <li><strong>Email:</strong> hello@brewandbliss.com</li>
        <li><strong>Phone:</strong> +63 912 345 6789</li>
        <li><strong>Location:</strong> 123 Bean Street, Angeles City, PH</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact',
  data () {
    return {
      title: 'Contact Us'
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 3rem 2rem;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom right, #fefefe, #f3f3f3);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: auto;
  animation: fadeIn 0.8s ease-in-out;
}

h1 {
  font-size: 2.5rem;
  color: #6f4e37;
  text-align: center;
  margin-bottom: 1.5rem;
}

.intro {
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #444;
}

.info-card {
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 1rem 0;
  font-size: 1rem;
  color: #333;
}

strong {
  color: #a0522d;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
