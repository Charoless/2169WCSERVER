<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <p class="intro">Welcome to <strong>Brew & Bliss</strong>, your cozy corner for handcrafted coffee and indulgent desserts. We believe in quality ingredients, warm ambiance, and unforgettable flavors.</p>

    <div class="content">
      <p>Founded in 2020 in the heart of Angeles City, our café blends artisanal brewing techniques with a passion for sweet creations—from velvety cheesecakes to flaky croissants. Every cup and every bite is crafted with care, using locally sourced beans and seasonal ingredients.</p>

      <p>Our baristas are trained in the art of espresso, pour-over, and cold brew, ensuring that each drink meets the highest standards. Whether you're a fan of bold dark roasts or creamy lattes, we’ve got something to satisfy your cravings.</p>

      <p>On the dessert side, our pastry chefs whip up daily batches of treats like matcha tiramisu, mango panna cotta, and chocolate lava cake. We also offer vegan and gluten-free options so everyone can indulge.</p>

      <p>At Brew & Bliss, we’re more than just a café—we’re a community hub. From poetry nights to latte art workshops, we host events that bring people together over shared passions and great food.</p>

      <p>Come visit us and experience the perfect blend of comfort, creativity, and culinary delight.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      title: 'About Us'
    }
  }
}
</script>

<style scoped>
.about {
  padding: 3rem 2rem;
  font-family: 'Segoe UI', sans-serif;
  color: #2c2c2c;
  background: linear-gradient(to right, #f8f8f8, #ffffff);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 900px;
  margin: auto;
  animation: fadeIn 0.8s ease-in-out;
}

h1 {
  font-size: 2.5rem;
  color: #6f4e37;
  margin-bottom: 1.5rem;
  text-align: center;
}

.intro {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
}

.content p {
  margin-bottom: 1.2rem;
  line-height: 1.7;
}

strong {
  color: #a0522d;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
