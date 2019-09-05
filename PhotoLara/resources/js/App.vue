<template>
  <div>
    <header>
      <Navibar />
    </header>
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navibar from './components/Navibar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navibar,
    Footer
  }
}
</script>