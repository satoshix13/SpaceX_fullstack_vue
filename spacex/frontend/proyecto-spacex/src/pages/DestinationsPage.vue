<template>
  <div class="container page-80">

    <div class="pt-6 pl-3">
      <h1 class="line titles">Destinations</h1>
    </div>
    
    <div class="columns">
      <div class="column is-half p-3">
        <div class="columns is-multiline">
            <a 
              class="column is-4 m-5 btn-white"
              :class="{ active: destination.name === currentDestination }"
              v-for="destination in destinations" 
              :key="destination._id"
              @click.prevent="currentDestination = destination.name"
            >
              {{destination.name}}
            </a>
        </div>
      </div>

      <div class="column is-half p-3">
        <div 
          class="card has-background-blue columns is-multiline m-3"
          v-for="(item, index) in destinationSelected"
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
                <b-tag type="is-info">{{item.distance}}</b-tag>
                <b-tag>million km</b-tag>
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
  name: "DestinationsPage",
  data() {
    return {
      destinations: [],
      currentDestination: "Moon"
    }
  },
  created() {
    this.$http.get("/destinations").then((destinations) => {
      this.destinations =  destinations.data.reverse()
      this.currentDestination = this.destinations[0].name
    })
  },
  computed: {
    destinationSelected() {
      return this.destinations.filter(
        (item) => item.name === this.currentDestination
      );

    }
  }
}
</script>