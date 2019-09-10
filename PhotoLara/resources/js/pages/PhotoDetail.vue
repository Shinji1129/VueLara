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
      <p>testtesttesttesttesttesttesttesttesttesttest</p>
    </div>
    </div>
  </div>
</template>

<script>
import { OK } from '../util'

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