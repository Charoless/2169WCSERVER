<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'home' }">Brew & Bliss</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ name: 'home' }">Home
                <span class="visually-hidden">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'blog' }">Blog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'gallery' }">Gallery</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'contact' }">Contact</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu">
                <router-link class="dropdown-item" :to="{ name: 'action' }">Action</router-link>
                <router-link class="dropdown-item" :to="{ name: 'another-action' }">Another action</router-link>
                <router-link class="dropdown-item" :to="{ name: 'something-else' }">Something else here</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" :to="{ name: 'separated-link' }">Separated link</router-link>
              </div>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-sm-2" type="search" placeholder="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.bg-primary {
  background-color: #3e2723 !important; /* Deep mocha brown */
}

.navbar .nav-link,
.navbar-brand {
  color: #f5f5dc !important; /* Light beige */
}

.navbar .nav-link:hover,
.navbar-brand:hover {
  color: #ffe4c4 !important; /* Soft mocha highlight */
}

.navbar-toggler {
  border-color: #f5f5dc;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='beige' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
