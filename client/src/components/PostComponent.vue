<template>
  <div class="container">
    <h1> Latest posts </h1>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post.id"
      >
        <p class="text">{{ post.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },

  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
