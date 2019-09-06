<template>
  <nav class="navbar">
    <RouterLink class="brand" to="/">
    <h1>PhotoLara</h1>
    </RouterLink>
    <div class="nav-menu">
      <ul class="nav-list">
        <li class="nav-item">
          <button class="btn">
            <i class="icon ion-md-add"></i>
            投稿する
          </button>
        </li>
        <li v-if="isLogin" class="nav-item">
          {{ username }}
        </li>
        <li v-if="isLogin" class="nav-item">
          <button class="btn btn-link" @click="logout">ログアウト</button>
        </li>
        <li v-else class="nav-item">
          <RouterLink class="btn btn-link" to="/login">
          ログイン・新規登録
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
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

      this.$router.push('/')
    }
  }
}
</script>
