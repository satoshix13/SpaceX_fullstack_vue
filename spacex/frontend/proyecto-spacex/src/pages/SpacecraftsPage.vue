<template>
  <div class="container page-80">

    <div class="pt-6 pl-3">
      <h1 class="line titles">Spacecrafts</h1>
    </div>
    
    <div class="columns">
      <div class="column is-half p-3">
        <div class="columns is-multiline">
            <a 
              class="column is-4 m-5 btn-white"
              :class="{ active: spacecraft.name === currentSpacecraft }"
              v-for="spacecraft in spacecrafts" 
              :key="spacecraft._id"
              @click.prevent="currentSpacecraft = spacecraft.name"
            >
              {{spacecraft.name}}
            </a>
        </div>
      </div>

      <div class="column is-half p-3">
        <div 
          class="card has-background-blue columns is-multiline m-3"
          v-for="(item, index) in spacecraftSelected"
          :item="item"
          :key="index"
        >
          <div class="column card-header">
            <img :src="item.image" alt="image">
          </div>
          <div class="column p-5">
            <p class="title is-4 has-text-white"> {{item.name}} </p>
            <p class="subtitle is-6">
              <b-taglist attached>
                <b-tag type="is-info">passengers</b-tag>
                <b-tag>{{item.passengers}}</b-tag>
              </b-taglist> 
            </p>
            <p class="txt-justify"> {{item.description}} </p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "SpacecraftsPage",
  data() {
    return {
      spacecrafts: [],
      currentSpacecraft: "Moon"
    }
  },
  created() {
    this.$http.get("/spacecrafts").then((spacecrafts) => {
      this.spacecrafts =  spacecrafts.data
      this.currentSpacecraft = this.spacecrafts[0].name
    })
  },
  computed: {
    spacecraftSelected() {
      return this.spacecrafts.filter(
        (item) => item.name === this.currentSpacecraft
      );

    }
  }
}
</script>