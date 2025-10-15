<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">⚡exporia</h1>
        <button @click="$router.back()" class="text-gray-600 hover:text-gray-800">✕</button>
      </div>
    </nav>

    <div class="container mx-auto px-6 py-12">
      <h1 class="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div v-if="cartItems.length === 0" class="text-center py-12 text-gray-500">
        Your cart is empty
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 space-y-6">
          <div v-for="item in cartItems" :key="item.id" 
               class="flex items-center bg-white rounded-lg shadow-md p-4">
            
            <img :src="item.image || 'images/img.png'" :alt="item.name" class="w-24 h-24 object-cover rounded-lg mr-4">
            
            <div class="flex-grow">
              <h2 class="text-lg font-semibold">{{ item.name }}</h2>
              <p class="text-gray-600">₱{{ item.price.toFixed(2) }}</p>
            </div>

            <div class="flex items-center space-x-4">
              <div class="flex items-center border rounded-lg">
                <button @click="updateQuantity(item, item.quantity - 1)" 
                        class="px-3 py-1 text-lg font-medium hover:bg-gray-100">-</button>
                <input type="number" :value="item.quantity" @change="e => updateQuantity(item, parseInt(e.target.value))" 
                       class="w-12 text-center border-l border-r outline-none text-gray-700" min="1">
                <button @click="updateQuantity(item, item.quantity + 1)" 
                        class="px-3 py-1 text-lg font-medium hover:bg-gray-100">+</button>
              </div>
              <button @click="removeItem(item)" class="text-red-500 hover:text-red-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
          <h2 class="text-2xl font-bold mb-4">Order Summary</h2>

          <div class="mb-6 border-b pb-4">
            <h3 class="font-semibold mb-2">Promo Code</h3>
            <div class="flex space-x-2">
              <input type="text" v-model="promoCode" placeholder="Enter code"
                     class="flex-grow px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none">
              <button @click="applyPromo" :disabled="!promoCode"
                      class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400">
                Apply
              </button>
            </div>
            <p v-if="promoMessage" :class="promoValid ? 'text-green-600' : 'text-red-600'" class="mt-2 text-sm">{{ promoMessage }}</p>
          </div>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span>₱{{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping Cost</span>
              <span>₱{{ shippingCost.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-red-600" v-if="discount > 0">
              <span class="font-semibold">Discount ({{ discountRate }}%)</span>
              <span>- ₱{{ discount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total</span>
              <span>₱{{ total.toFixed(2) }}</span>
            </div>
          </div>

          <button @click="proceedToCheckout"
                  class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <footer class="text-center py-4 text-gray-500 border-t mt-12">
      &copy; 2024 Shoporia. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cartItems: [],
      promoCode: '',
      discountRate: 0,
      promoValid: false,
      promoMessage: '',
      shippingCost: 200 // Default shipping cost
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    discount() {
      return this.subtotal * (this.discountRate / 100)
    },
    total() {
      return this.subtotal + this.shippingCost - this.discount
    }
  },
  mounted() {
    this.loadCart()
  },
  methods: {
    loadCart() {
      this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    },
    updateQuantity(item, newQty) {
      newQty = parseInt(newQty)
      if (isNaN(newQty) || newQty <= 0) {
        this.removeItem(item)
      } else {
        item.quantity = newQty
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        this.loadCart() // Reload to ensure computed properties update
      }
    },
    removeItem(item) {
      this.cartItems = this.cartItems.filter(i => i.id !== item.id)
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
      this.loadCart()
    },
    applyPromo() {
      this.discountRate = 0;
      this.promoValid = false;
      this.promoMessage = '';

      const code = this.promoCode.toLowerCase().trim();

      switch (code) {
        case 'shopatshoporia':
          this.discountRate = 10;
          this.promoValid = true;
          this.promoMessage = 'Promo code applied! You received a 10% discount.';
          break;
        case 'promosale':
          this.discountRate = 15;
          this.promoValid = true;
          this.promoMessage = 'Promo code applied! You received a 15% discount.';
          break;
        case '1010atshoporia':
          this.discountRate = 20;
          this.promoValid = true;
          this.promoMessage = 'Promo code applied! You received a 20% discount.';
          break;
        default:
          this.promoMessage = 'Invalid promo code. Please try again.';
          break;
      }
    },
    proceedToCheckout() {
      if (this.cartItems.length === 0) {
        alert('Your cart is empty. Add items before checking out.');
        return;
      }
      // Save current cart total and discount to session/local storage for checkout page
      const checkoutData = {
          cartItems: this.cartItems,
          subtotal: this.subtotal,
          shippingCost: this.shippingCost,
          discount: this.discount,
          total: this.total,
          promoCode: this.promoCode,
          discountRate: this.discountRate
      };
      sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));

      this.$router.push('/checkout');
    }
  }
}
</script>

<style scoped>
/* Scoped styles from original cart.vue */
</style>