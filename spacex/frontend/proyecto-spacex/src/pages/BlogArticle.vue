<template>
<div class="container">
  <div class="pt-6 pl-3">
    <h1 class="line titles">Blogs</h1>
  </div>
 
    <div class="padre p-4">

      <div class="card has-background-blue hijo">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="article.image" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title has-text-blue is-4">{{article.title}} <br>
              <b-tag>Admin</b-tag>
              </p>
            </div>
          </div>

          <div class="content">
            <p>{{article.body}}</p>

            <p>{{ article.published | toDate }}</p>
          </div>
        </div>
      </div>

  </div>
</div>
</template>

<script>
export default {
  name: "BlogArticle",
  data() {
    return {
      article: {},
    };
  },
  created() {
    this.getArticle;
  },
  computed: {
    async getArticle() {
      const id = this.$route.params.id;
      try {
        let article = await this.$http.get("/articles/" + id);
        this.article = article.data;
      } catch (e) {
        console.log(e);
        alert("sorry, wasn't possible to get article");
      }
    },
  },
};
</script>
