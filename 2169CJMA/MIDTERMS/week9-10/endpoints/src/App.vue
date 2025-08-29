<script>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import AboutUs from './components/AboutUs.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TheWelcome, 
    AboutUs
  },
  data() {
    return {
      msg6: '',
      studentName: 'Charles Joseph M. Antonio',
      education: '3rd Year BSIT - Web Development Major',
      skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Git'],
      experience: 'Built multiple academic web projects using Vue.js, HTML, CSS, JavaScript, and more.',
      projects: [
        {
          title: 'Portfolio Website',
          description: 'A personal portfolio built with Vue.js showcasing skills, projects, and contact info.'
        },
        {
          title: 'E-Commerce Prototype',
          description: 'Developed a mock online store with product listings, cart functionality, and checkout flow.'
        },
        {
          title: 'Student Management System',
          description: 'Created a CRUD-based web app to manage student records using Firebase and Vue.'
        }
      ],
      contact: {
        email: 'charles.antonio@example.com',
        phone: '+63 912 345 6789',
        linkedin: 'linkedin.com/in/charlesantonio',
        github: 'github.com/charlesantonio'
      }
    }
  }
}
</script>

<template>
  <div class="page-wrapper">
    <header>
      <img alt="Vue logo" class="logo" src="./assets/profile.png" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="My Resume" />
      </div>
    </header>

    <main>
      <!-- <TheWelcome /> -->
      <section class="resume-section">
        <h2>👤 Name: {{ studentName }}</h2>
        <h3>🎓 Education: {{ education }}</h3>
        <h3>🛠 Skills:</h3>
        <ul>
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
        <h3>📁 Experience:</h3>
        <p>{{ experience }}</p>
      </section>

      <section class="projects-section">
        <h3>💻 Projects Made:</h3>
        <ul>
          <li v-for="project in projects" :key="project.title">
            <strong>{{ project.title }}:</strong> {{ project.description }}
          </li>
        </ul>
      </section>

      <section class="contact-section">
        <h3>📞 Contact Information:</h3>
        <ul>
          <li><strong>Email:</strong> {{ contact.email }}</li>
          <li><strong>Phone:</strong> {{ contact.phone }}</li>
          <li><strong>LinkedIn:</strong> <a :href="'https://' + contact.linkedin" target="_blank">{{ contact.linkedin }}</a></li>
          <li><strong>GitHub:</strong> <a :href="'https://' + contact.github" target="_blank">{{ contact.github }}</a></li>
        </ul>
      </section>
    </main>

    <div id="app">
      <h1>{{ msg6 }}</h1>
      <AboutUs></AboutUs> 
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  background-color: #f5f0e6; 
  color: #5c4432; 
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

header {
  line-height: 1.5;
  background-color: #a68b6d;
  color: #ffffff;
  padding: 1rem;
  border-bottom: 2px solid #5c4432;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(92, 68, 50, 0.3);
}

.resume-section,
.projects-section,
.contact-section {
  margin: 2rem;
  padding: 1rem;
  background-color: #d8cfc4; 
  border-radius: 8px;
  border: 1px solid #a68b6d;
}

.resume-section h2,
.resume-section h3,
.projects-section h3,
.contact-section h3 {
  margin-bottom: 0.5rem;
  color: #8e735b; 
}

.resume-section ul,
.projects-section ul,
.contact-section ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}

.contact-section a {
  color: #5c4432;
  text-decoration: none;
}

.contact-section a:hover {
  text-decoration: underline;
  color: #8e735b;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: 2rem;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
