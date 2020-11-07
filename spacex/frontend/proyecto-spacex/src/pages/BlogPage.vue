<template>
<div class="container">

  <div class="pt-6 pl-3">
    <h1 class="line titles">Blogs</h1>
  </div>
 
  <div class="columns is-multiline p-3">
    <div v-for="article in articles" :key="article._id" class="column is-3">
      <div class="card card-blog">
        <div class="card-image">
          <figure class="image is-4by3">
            <router-link :to="{ name:'BlogArticle', params: {id: article._id }}">
              <img :src="article.image" alt="Placeholder image">
            </router-link>
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">
                <router-link :to="{ name:'BlogArticle', params: {id: article._id }}">
                  {{article.title}}
                </router-link> <br>
                <b-tag>Admin</b-tag>
              </p>
            </div>
          </div>
          <div class="content">
            <p>{{article.excerpt}}</p>
            <p>{{ article.published | toDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "BlogPage",
  data(){
    return {
      articles:[]
    }
  },
  created(){
    this.$http.get("/articles").then((articles) => {
      this.articles =  articles.data.reverse()
  })
  }
}
</script>