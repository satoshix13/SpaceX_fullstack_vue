<template>
  <nav class="navbar is-transparent p-3" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        
        <router-link class="navbar-item" :to="{ name:'HomePage'}">
          <img src="../assets/spacex-logo-svg-vector.svg" alt="logo spacex" height="28">
        </router-link>
        
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu has-background-darkblue">
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name:'HomePage'}">
          Home
          </router-link>

          <router-link class="navbar-item" :to="{ name:'SpacecraftsPage'}">
            Spacecrafts
          </router-link>
          
          <router-link class="navbar-item" :to="{ name:'DestionationsPage'}">
            Destinations
          </router-link>

          <router-link v-if="isAuth" class="navbar-item" :to="{ name:'MissionsPage'}">
            Missions
          </router-link>
          
          <router-link class="navbar-item" :to="{ name:'BlogPage'}">
            Blog
          </router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            
            <div v-if="isAuth" class="navbar-item has-dropdown is-hoverable">
              <router-link class="navbar-link" :to="{ name:'ProfilePage'}">
                <i class="fas fa-user-circle mr-2"></i>
                Profile
              </router-link>
              <div class="navbar-dropdown is-boxed has-background-dark bg-dark">
                <a class="navbar-item" @click.prevent="logout">
                  Logout
                </a>
              </div>
            </div>

            <div v-if="isAdmin" class="buttons">
              <a class="button m-2">
                <span>
                  <router-link :to="{ name:'AdminPage'}">ADMIN</router-link>
                </span>
              </a>
            </div>

            <div v-if="!isAuth" class="buttons">
              <a class="button">
                <span>
                  <router-link :to="{ name:'LoginPage'}">Login</router-link>
                </span>
              </a>
              <a class="button is-blue" href="#">
                <span>
                  <router-link class="has-text-white" :to="{ name:'RegisterPage'}">Sign up</router-link>
                </span>
              </a>
            </div>
          </div>
        
        </div>
      </div>
    </nav>
</template>


<script>
import $ from "jquery"

export default {
  name: "MainNav",
  mounted() {
    $(document).ready(function() {
      let navbar = document.querySelector(".navbar-burger");
      navbar.addEventListener("click", function() {
        let target = navbar.dataset.target;
        let $target = document.getElementById(target);
        navbar.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  },
 
  computed: {
    isAuth(){
      return this.$store.state.isAuth
    },
    isAdmin(){
      return this.$store.state.profile === 'admin'
    }
  },
  created(){
    const token = window.localStorage.getItem("token")
    if(token){
      this.$store.commit("login", token)
    }
  },
  methods: {
    logout(){
      window.localStorage.removeItem("token")
      this.$store.commit("logout")
      this.$router.push({name: "HomePage"})
    }
  }
}

</script>