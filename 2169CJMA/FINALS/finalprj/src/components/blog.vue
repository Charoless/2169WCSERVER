<template>
  <div class="blog">
    <h1>{{ title }}</h1>
    <p class="intro">Explore some of the best coffee blogs from around the world. Whether you're a home brewer or a café explorer, these reads will inspire your next cup.</p>

    <div class="blog-links">
      <a href="https://sprudge.com/" target="_blank" rel="noopener" class="blog-card">
        <h2>Sprudge</h2>
        <p>Global coffee culture and original journalism since 2009.</p>
      </a>

      <a href="https://perfectdailygrind.com/" target="_blank" rel="noopener" class="blog-card">
        <h2>Perfect Daily Grind</h2>
        <p>Specialty coffee insights from seed to cup.</p>
      </a>

      <a href="https://coffeechronicler.com/" target="_blank" rel="noopener" class="blog-card">
        <h2>The Coffee Chronicler</h2>
        <p>Geeky brewing tips and deep dives into coffee gear.</p>
      </a>

      <a href="https://europeancoffeetrip.com/" target="_blank" rel="noopener" class="blog-card">
        <h2>European Coffee Trip</h2>
        <p>Discover specialty cafés and coffee culture across Europe.</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data () {
    return {
      title: 'Blog'
    }
  }
}
</script>

<style scoped>
.blog {
  padding: 3rem 2rem;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom right, #fffdf7, #f8f4ec);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 900px;
  margin: auto;
  animation: fadeIn 0.8s ease-in-out;
}

h1 {
  font-size: 2.5rem;
  color: #6f4e37;
  text-align: center;
  margin-bottom: 1rem;
}

.intro {
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  margin-bottom: 2rem;
}

.blog-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.blog-card h2 {
  margin-bottom: 0.5rem;
  color: #a0522d;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
