<template>
  <div class="gallery">
    <h1>{{ title }}</h1>
    <p class="intro">A glimpse into the heart of Brew & Bliss—where every cup and every dessert tells a story.</p>
    <div class="images">
      <img :src="require('@/assets/img/1.jpg')" alt="Coffee" />
      <img :src="require('@/assets/img/2.jpg')" alt="Dessert" />
      <img :src="require('@/assets/img/3.png')" alt="Cafe Interior" />
      <img :src="require('@/assets/img/4.jpg')" alt="Cafe Interior" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data () {
    return {
      title: 'Gallery'
    }
  }
}
</script>

<style scoped>
.gallery {
  padding: 3rem 2rem;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom right, #fffdf7, #f3f3f3);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 1000px;
  margin: auto;
  animation: fadeIn 0.8s ease-in-out;
}

h1 {
  font-size: 2.5rem;
  color: #6f4e37;
  margin-bottom: 1rem;
  text-align: center;
}

.intro {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
}

.images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.images img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.images img:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
