<template>
  <div
    v-if="photo"
    class="photo-detail"
    :class="{ 'photo-detail--column': fullWidth }"
    >
    <figure
      class="photo-detail--panel photo-detail--image"
      @click="fullWidth = ! fullWidth">
      <img
      :src="photo.url" alt=""
      >
    </figure>
    <div class="photo-detail--contents">
      <figcaption>Posted by {{ photo.owner.name }}</figcaption>
        <div class="photo-detail--btns">
          <button class="button button--like button--detail" title="Like photo">
            <i class="icon ion-md-heart"></i>
          </button>
          <a
            :href="`/photos/${photo.id}/download`"
            class="button button--detail-down"
            title="Download photo"
          >
            <i class="icon ion-md-archive"></i>Download
          </a>
        </div>
    </div>
    <div class="photo-detail--comment">
      <h2 class="photo-detail--title">Comments</h2>
      <ul v-if="photo.comments.length > 0" class="photo-detail--comments">
        <li
          v-for="comment in photo.comments"
          :key="comment.content"
          class="photo-detail--commentContent"
        >
          <p class="photo-detail--commentAuth">
            {{ comment.author.name }}:
          </p>
          <p class="photo-detail--commentBody">
            {{ comment.content }}
          </p>
        </li>
        </ul>
        <p v-else>コメントはありません。</p>
      <form @submit.prevent="addComment" class="form">
        <div v-if="commentErrors">
            <div v-if="commentErrors.content">
              <span v-for="msg in commentErrors.content" :key="msg" class="errors">＊{{ msg }}</span>
            </div>
          </div>
        <textarea class="form--item" v-model="commentContent"></textarea>
        <div class="form--button">
          <button type="submit" class="button button--inverse">投稿する</button>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

<script>
import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      photo: null,
      commentContent: '',
      commentErrors: null,
      fullWidth: false
    }
  },
  methods: {
    async fetchPhoto () {
      const response = await axios.get(`/api/photos/${this.id}`)

      if (response.status !== OK) {
        this.$store.commit('error/setCode', response.status)
        return false
      }

      this.photo = response.data
    },
    async addComment () {
      const response = await axios.post(`/api/photos/${this.id}/comments`, {
        content: this.commentContent
      })

      if (response.status === UNPROCESSABLE_ENTITY) {
      this.commentErrors = response.data.errors
      return false
      }

      this.commentContent = ''
      this.commentErrors = null

      if (response.status !== CREATED) {
      this.$store.commit('error/setCode', response.status)
      return false
      }

      this.$set(this.photo, 'comments', [
        response.data,
        ...this.photo.comments
      ])
    }
  },
  watch: {
    $route: {
      async handler () {
        await this.fetchPhoto()
      },
      immediate: true
    }
  }
}
</script>