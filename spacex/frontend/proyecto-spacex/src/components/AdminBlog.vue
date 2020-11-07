<template>
  <div class="columns">

    <div class="column is-half">
      <h1 class="title is-size-5 has-text-blue">Add a New Article</h1>

      <div class="columns">
        <div class="column is-half">
          <div class="field ">
            <div class="control has-icons-left">
              <input
                v-model="article.title"
                class="input"
                type="text"
                placeholder="title"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-globe-europe"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="column is-half">
          <div class="field ">
            <div class="control has-icons-left">
              <input
                v-model="article.image"
                class="input"
                type="text"
                placeholder="Image"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-image"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-halft">
          <div class="field ">
            <div class="control">
              <textarea
                v-model="article.body"
                class="textarea"
                placeholder="Description"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!editMode" class="field is-grouped">
        <p class="control">
          <button class="button is-blue has-text-white" @click.prevent="createArticle">
            Save
          </button>
        </p>
        <p class="control">
          <button class="button is-light" @click.prevent="cancel">
            Cancel
          </button>
        </p>
      </div>

      <div v-if="editMode" class="field is-grouped">
        <p class="control">
          <button class="button is-blue has-text-white"  @click.prevent="updateArticle">
            Save Changes
          </button>
        </p>
        <p class="control">
          <button class="button is-light" @click.prevent="cancelUpdate">
            Cancel
          </button>
        </p>
      </div>
    </div>


    <div class="column is-half">
      <h1 class="title is-size-5 has-text-blue">Articles</h1>
      <button class="button is-coral" @click="listArticles">List Articles</button>

      <!-- Card 1 -->
      <div v-show="showArticleList">
        <div 
          v-for="article in articles" 
          :key="article._id"
          class="card card-size mt-4"
          >
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-128x128">
                  <img :src="article.image" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4"> {{article.title}} </p>
                <p class="subtitle"> {{ article.published | toDate }} </p>
              </div>
            </div>
            <p>{{article.body}}</p>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click.prevent="editArticle(article._id)">Edit</a>
            <a href="#" class="card-footer-item" @click.prevent="deleteArticle(article._id)">Delete</a>
          </footer>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminBlog",
  data() {
    return {
      article: {
        title: "",
        image: "",
        body: "",
      },
      articles:[],
      showArticleList: false,
      editMode: false,
      article_id:""
    };
  },
  created() {
    this.$http.get("/articles").then((articles) => {
      this.articles =  articles.data.reverse()
    })
  },
  methods: {
    listArticles(){
      this.showArticleList = !this.showArticleList
    },
    async createArticle() {
      try {
        await this.$http.post("/articles", this.article);
        this.$buefy.toast.open({
                    message: 'New article has been created!',
                    type: 'is-success'
                })

      } catch (e) {
        console.log(e);
        this.$buefy.toast.open({
                    message: 'Ups, looks like something went wrong. Please try again later :)',
                    type: 'is-danger'
                })
      }
      this.clearFields()
    },
    clearFields(){
     this.article = {}
    },
    cancel(){
      this.clearFields()
    },
    async deleteArticle(id){
      try{
        await this.$http.delete("/articles/"+id)
        const articleIndex = this.articles.findIndex(article => article._id === id)
        this.articles.splice(articleIndex,1)
        this.$buefy.toast.open({
                    message: 'Article has been deleted'
                })

      }catch(e){
        console.log(e)
        this.$buefy.toast.open({
                    message: 'Ups, looks like something went wrong. Please try again later :)',
                    type: 'is-danger'
                })
      }
    },
    async editArticle(id){
      this.editMode = true
      const index = this.articles.findIndex((article)=> article._id === id)
      let article = this.articles[index]
      this.article = article
      this.article_id = id
    },
    cancelUpdate(){
      this.clearFields()
      this.editMode = false
    },
    async updateArticle(){
      let id = this.article_id
      let updatedArticle = this.article
      try{
        await this.$http.put("/articles/"+id, updatedArticle)
        this.$buefy.toast.open({
                    message: 'Article has been updated!',
                    type: 'is-success'
                })
        this.clearFields()
        this.editMode = false
      }catch(e){
        console.log(e)
        this.$buefy.toast.open({
                    message: 'Ups, looks like something went wrong. Please try again later :)',
                    type: 'is-danger'
                })
      }
    }
  }
}
</script>
