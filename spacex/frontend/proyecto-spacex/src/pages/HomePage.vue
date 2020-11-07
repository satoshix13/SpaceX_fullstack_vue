<template>

<div id="app" class="full-page">
    
    <video src="../../public/videos/videoplayback1.mp4" width=100% height=100% controls poster="../../public/images/portada100.png" autoplay loop>
    </video>

    <div class="hero-home">
      <img src="../../public/images/rockets.jpg" alt="" style="width:100%">

      <router-link class="btn-white centered" style="width:200px" :to="{ name:'SpacecraftsPage'}">
        Spacecrafts
      </router-link>
    </div>

    <div class="hero-home">
      <img src="../../public/images/planetas.jpg" alt="" style="width:100%">

      <router-link class="btn-white centered" style="width:200px" :to="{ name:'DestionationsPage'}">
        Destinations
      </router-link>
    </div>

    <!-- <div class="hero-home">
      <img src="../../public/images/astronauta3.jpg" alt="" style="width:100%">
    </div> -->

    <div class="hero-home">
      <img src="../../public/images/instalacion.png" alt="" style="width:100%">
    </div>

</div>

</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      
    }
  }
}
</script>