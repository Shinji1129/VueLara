<template>
  <nav class="navbar">
    <RouterLink class="brand" to="/">
    <h1>PhotoLara</h1>
    </RouterLink>
    <div class="nav">
      <ul class="nav--list">
        <li class="nav--item">
          <button class="button button--blue" @click="showForm = ! showForm">
            <i class="icon ion-md-add"></i>投稿する
          </button>
        </li>
        <li v-if="isLogin" class="nav--item">
          <i class="icon ion-md-person"></i>{{ username }}
        </li>
        <li v-if="isLogin" class="nav--item">
          <button class="button button--blue" @click="logout">ログアウト</button>
        </li>
        <li v-else class="nav--item">
          <RouterLink class="button button--link" to="/login">
          ログイン・新規登録
          </RouterLink>
        </li>
      </ul>
    </div>
    <PhotoForm v-model="showForm" />
  </nav>
</template>

<script>
import PhotoForm from './PhotoForm.vue'

export default {
  components: {
    PhotoForm
  },
  data () {
    return {
      showForm: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    },
    username () {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')

      this.$router.push('/').catch(err => {})
    },
  }
}
</script>
