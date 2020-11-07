<template>

<div id="app">

  <vue-particles class="vue-part"
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="65"
    shapeType="circle"
    :particleSize="4"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="false"
  ></vue-particles>

    <div id="container-form" class="has-text-centered">

      <router-link :to="{ name:'HomePage'}">
        <img class="logo" src="../assets/spacex-logo-svg-vector-1.png" alt="logo spacex">
      </router-link>

      <p class="has-text-weight-normal has-text-white is-size-4 mt-3">Welcome Back!</p>

      <div class="field  mt-6 mb-6">
        <div class="form control has-icons-left has-icons-right">
          <input v-model.trim="loginData.email" class="input has-text-white" type="email" placeholder="Email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field  mt-6 mb-6">
        <div class="form control has-icons-left has-icons-right">
          <input v-model.trim="loginData.password" class="input has-text-white" type="password" placeholder="Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
          
      <button class="btn button mt-3" @click.prevent="login">Login</button>

    </div>

</div>

</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      loginData:{
        email:"",
        password:""
      }
    }
  },
  methods:{
    async login(){
      try{
        const response = await this.$http.post("/auth/login", this.loginData)
        window.localStorage.setItem("token", response.data.token)
        this.$store.commit("login", response.data.token)
        this.$router.push({ name: "HomePage"})
      }catch(e){
        console.log(e)
        this.$buefy.toast.open({
                    message: "If you have regestered account, but can't access. Please try a little bit later or contact administration",
                    type: 'is-danger'
                })
        this.loginData.email = "",
        this.loginData.password = ""
      }
    }
  }
}
</script>