<template>
  <div class="container">
    <ul class="tab">
      <li class="tab_item" :class="{'tab_item--active': tab === 1 }" @click="tab = 1">
        ログイン
      </li>
      <li class="tab_item" :class="{'tab_item--active': tab === 2 }" @click="tab = 2">
        新規登録
      </li>
    </ul>
    <div class="panel" v-show="tab === 1">
      <form class="form" @submit.prevent="login">
        <label for="login_email">Email</label>
        <input type="email" class="form_item" id="login_email" v-model="loginForm.email">
        <label for="login_password">パスワード</label>
        <input type="password" class="form_item" id="login_password" v-model="loginForm.password">
        <div class="form_btn">
          <button type="submit" class="btn submit_btn" >ログイン</button>
        </div>
      </form>
    </div>
    <div class="panel" v-show="tab === 2">
      <form class="form" @submit.prevent="register">
        <label for="username">お名前</label>
        <input type="text" class="form_item" id="username" v-model="registerForm.name">
        <label for="email">Email</label>
        <input type="email" class="form_item" id="email" v-model="registerForm.email">
        <label for="password">パスワード</label>
        <input type="password" class="form_item" id="password" v-model="registerForm.password">
        <label for="password_confirmation">パスワード（確認用）</label>
        <input type="password" class="form_item" id="password_confirmation" v-model="registerForm.password">
        <div class="form_btn">
          <button type="submit" class="btn submit_btn" >新規登録</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
  methods: {
    login () {
      console.log(this.loginForm)
    },
    register () {
      console.log(this.registerForm)
    }
  }
}
</script>