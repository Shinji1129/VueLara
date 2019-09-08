<template>
  <div v-show="value" class="photo-form">
    <form class="form">
      <input type="file" class="form--item">
      <div class="form-btn">
        <button type="submit" class="button button--form">投稿</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>