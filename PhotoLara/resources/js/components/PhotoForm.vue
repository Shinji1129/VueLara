<template>
  <div v-show="value" class="photo-form">
    <div v-show="loading" class="loading-panel">
      <Loader></Loader>
    </div>
    <form
      v-show="! loading"
      class="form"
      @submit.prevent="submit"
      >
      <div class="errors" v-if="errors">
        <div v-if="errors.photo">
          <span v-for="msg in errors.photo" :key="msg">{{ msg }}<br></span>
        </div>
      </div>
      <input class="form--item" type="file" @change="onFileChange">
      <output class="form--output" v-if="preview">
        <img :src="preview" alt="">
      </output>
      <div class="form--btn">
        <button
          type="submit"
          class="button button--form"
          @click="onPostClick"
        >
        投稿
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { CREATED, UNPROCESSABLE_ENTITY } from '../util'
import Loader from './Loader.vue'

export default {
  components: {
    Loader
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      preview: null,
      photo: null,
      errors: null
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    }
  },
  methods: {
    onPostClick () {
      if (! this.isLogin) {
        alert('投稿するにはログインしてください。')
        return false
      }　else {
        return true
      }
    },
    onFileChange (event) {
      if (event.target.files.length === 0) {
        this.reset()
        return false
      }

      if (! event.target.files[0].type.match('image.*')) {
        this.reset()
        return false
      }

      const reader = new FileReader()

      reader.onload = e => {
        this.preview = e.target.result
      }

      reader.readAsDataURL(event.target.files[0])

      this.photo = event.target.files[0]
    },

    reset () {
      this.preview = ''
      this.photo = null
      this.$el.querySelector('input[type="file"]').value = null
    },
    async submit () {
      this.loading = true

      const formData = new FormData()
      formData.append('photo', this.photo)
      const response = await axios.post('/api/photos', formData)

      this.loading = false

      if (response.status === UNPROCESSABLE_ENTITY) {
        this.errors = response.data.errors
        return false
      }

      this.reset()
      this.$emit('input', false)

      if (response.status !== CREATED) {
        this.$store.commit('error/setCode', response.status)
        return false
      }

      this.$store.commit('message/setContent', {
        content: '投稿されました!',
        timeout: 5000
      })

      this.$router.push(`/photos/${response.data.id}`).catch(err => {})
    }
  }
}
</script>