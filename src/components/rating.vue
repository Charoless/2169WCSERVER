<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">⚡exporia</h1>
        <button @click="$router.back()" class="text-gray-600 hover:text-gray-800">✕</button>
      </div>
    </nav>

    <div class="container mx-auto px-6 py-12">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">Rate</h1>

        <!-- Product Info -->
        <div v-if="product" class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div class="flex items-center gap-6">
            <div class="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <img v-if="product.image" :src="product.image" :alt="product.name" 
                class="w-full h-full object-cover rounded-lg">
              <svg v-else class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold">{{ product.name }}</h2>
              <p class="text-gray-600">₱{{ product.price?.toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Review Form -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold mb-6">Write a Review</h2>
          
          <form @submit.prevent="submitReview" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-3">Rating</label>
              <div class="flex gap-2">
                <button 
                  v-for="n in 5" 
                  :key="n"
                  type="button"
                  @click="rating = n"
                  class="text-4xl focus:outline-none transition"
                  :class="n <= rating ? 'text-yellow-400' : 'text-gray-300'">
                  ★
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Comment</label>
              <textarea 
                v-model="comment" 
                rows="5" 
                required
                placeholder="Share your thoughts about this product..."
                class="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent">
              </textarea>
            </div>

            <button type="submit" 
              class="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition">
              Submit Review
            </button>
          </form>
        </div>

        <!-- Existing Reviews -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6">Customer Reviews</h2>

          <div v-if="reviews.length === 0" class="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review!
          </div>

          <div v-else class="space-y-6">
            <div v-for="review in reviews" :key="review._id" 
              class="border-b border-gray-200 pb-6 last:border-0">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-bold">{{ review.user?.username || 'Anonymous' }}</h3>
                    <div class="flex">
                      <span 
                        v-for="n in 5" 
                        :key="n"
                        class="text-lg"
                        :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300'">
                        ★
                      </span>
                    </div>
                  </div>
                  <p class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</p>
                </div>
              </div>
              <p class="text-gray-700">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  data() {
    return {
      product: null,
      rating: 5,
      comment: '',
      reviews: []
    }
  },
  async created() {
    await this.fetchProduct()
    await this.fetchReviews()
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${this.$route.params.id}`)
        this.product = await response.json()
      } catch (err) {
        console.error(err)
      }
    },
    async fetchReviews() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${this.$route.params.id}/reviews`)
        this.reviews = await response.json()
      } catch (err) {
        console.error(err)
      }
    },
    async submitReview() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${this.$route.params.id}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            rating: this.rating,
            comment: this.comment
          })
        })

        if (response.ok) {
          alert('Review submitted!')
          this.rating = 5
          this.comment = ''
          await this.fetchReviews()
        } else {
          alert('Failed to submit review')
        }
      } catch (err) {
        console.error(err)
        alert('Please login to submit a review')
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>