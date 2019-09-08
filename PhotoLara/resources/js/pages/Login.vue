<template>
  <div class="container">
    <ul class="tab">
      <li class="tab--item" :class="{'tab_item--active': tab === 1 }" @click="tab = 1">
        ログイン
      </li>
      <li class="tab--item" :class="{'tab_item--active': tab === 2 }" @click="tab = 2">
        新規登録
      </li>
    </ul>
    <div class="panel" v-show="tab === 1">
      <form class="form" @submit.prevent="login">
        <label for="login_email">Email</label>
          <div v-if="loginErrors">
            <div v-if="loginErrors.email">
              <span v-for="msg in loginErrors.email" :key="msg" class="errors">＊{{ msg }}</span>
            </div>
          </div>
        <input type="email" class="form--item" id="login-email" v-model="loginForm.email">
        <label for="login_password">パスワード</label>
          <div v-if="loginErrors">
            <div v-if="loginErrors.password">
              <span v-for="msg in loginErrors.password" :key="msg" class="errors">＊{{ msg }}</span>
            </div>
          </div>
        <input type="password" class="form-item" id="login-password" v-model="loginForm.password">
        <div class="form--btn">
          <button type="submit" class="button button--submit">ログイン</button>
        </div>
      </form>
    </div>
    <div class="panel" v-show="tab === 2">
      <form class="form" @submit.prevent="register">
        <label for="username">お名前</label>
          <div v-if="registerErrors">
            <div v-if="registerErrors.name">
              <span v-for="msg in registerErrors.name" :key="msg" class="errors">＊{{ msg }}</span>
            </div>
          </div>
        <input type="text" class="form--item" id="username" v-model="registerForm.name">
        <label for="email">Email</label>
          <div v-if="registerErrors">
            <div v-if="registerErrors.email">
              <span v-for="msg in registerErrors.email" :key="msg" class="errors">＊{{ msg }}</span>
            </div>
          </div>
        <input type="email" class="form--item" id="email" v-model="registerForm.email">
        <label for="password">パスワード</label>
          <div v-if="registerErrors">
            <div v-if="registerErrors.password">
              <span v-for="msg in registerErrors.password" :key="msg" class="errors">＊{{ msg }}<br></span>
            </div>
          </div>
        <input type="password" class="form--item" id="password" v-model="registerForm.password">
        <label for="password-confirmation">パスワード（確認用）</label>
        <input type="password" class="form--item" id="password-confirmation" v-model="registerForm.password_confirmation">
        <div class="form--btn">
          <button type="submit" class="button button--submit" >新規登録</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      tab: 1,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus,
      loginErrors: state => state.auth.loginErrorMessages,
      registerErrors: state => state.auth.registerErrorMessages
    })
  },
  methods: {
    async login () {

      await this.$store.dispatch('auth/login', this.loginForm)

      if (this.apiStatus) {
        this.$router.push('/')
      }
    },
    async register () {
      await this.$store.dispatch('auth/register', this.registerForm)

      if (this.apiStatus) {

        this.$router.push('/')
      }
    },
    clearError () {
      this.$store.commit('auth/setLoginErrorMessages', null)
      this.$store.commit('auth/setRegisterErrorMessages', null)
    }
  },
  created () {
    this.clearError()
  }
}
</script>