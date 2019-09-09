<template>
  <div class="photo">
    <figure class="photo--wrap">
      <img
      class="photo--image"
      :src="item.url"
      :alt="`Photo by ${item.owner.name}`"
      >
    </figure>
    <RouterLink class="photo--overlay" :to="`/photos/${item.id}`" :title="`View the photo by ${item.owner.name}`">
    <div class="photo--controls">
      <button class="button--like photo--action photo--like" title="Like photo">
        <i class="icon ion-md-heart"></i>
      </button>
      <a class="photo--action photo--down" title="Download photo" @click.stop :href="`/photos/${item.id}/download`">
      <i class="icon ion-md-archive"></i>
      </a>
    </div>
    <div class="photo--username">
      by :{{ item.owner.name }}
    </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>