<template>
  <div id="app">
    <MainNav id="app"/>
    <router-view class="has-text-white"></router-view>
    <Footer id="app"/>
  </div>
</template>

<script>
import MainNav from  './components/MainNav'
import Footer from  './components/Footer'

export default {
  name: 'App',
  components: {
    MainNav,
    Footer
  }
}
</script>

<style>
</style>