<template>

<div>
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

    <div id="container-form" class="container has-text-centered">

      <router-link :to="{ name:'HomePage'}">
        <img class="logo" src="../assets/spacex-logo-svg-vector-1.png" alt="logo spacex">
      </router-link>

      <p class="has-text-weight-normal has-text-white is-size-4 mt-3">Create a New Account</p>

      <div class="columns">
        <div class="column is-half">

          <div class="form field  mt-6 mb-6">
            <div class="control has-icons-left">
              <input v-model="user.firstname" class="input has-text-white" type="text" placeholder="Firstname">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="form field  mt-6 mb-6">
            <div class="control has-icons-left">
              <input v-model="user.lastname" class="input has-text-white" type="text" placeholder="Lastname">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="form field  mt-6 mb-6">
            <div class="control has-icons-left">
              <input v-model="user.email" class="input has-text-white" type="email" placeholder="Email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="form field  mt-6">
            <div class="control has-icons-left">
              <input v-model="user.password" class="input has-text-white" type="password" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

        </div>

        <div class="column is-half">

          <div class="form field  mt-6">
            <div class="control has-icons-left">
              <input v-model="user.phone" class="input has-text-white" type="text" placeholder="Phone">
              <span class="icon is-small is-left">
                <i class="fas fa-mobile-alt"></i>
              </span>
            </div>
          </div>

          <div class="form field  mt-6 mb-6">
            <div class="control has-icons-left">
              <input v-model="user.weight" class="input has-text-white" type="number" placeholder="Weight (kg)">
              <span class="icon is-small is-left">
                <i class="fas fa-weight"></i>
              </span>
            </div>
          </div>

          <div class="form field  mt-6 mb-6">
            <div class="control has-icons-left">
              <input v-model="user.height" class="input has-text-white" type="number" placeholder="Height (cm)">
              <span class="icon is-small is-left">
                <i class="fas fa-arrows-alt-v"></i>
              </span>
            </div>
          </div>

          <div class="form field  mt-6 mb-6">
            <div class="control has-icons-left">
              <input v-model="user.age" class="input has-text-white" type="number" placeholder="Age">
              <span class="icon is-small is-left">
                <i class="fas fa-birthday-cake"></i>
              </span>
            </div>
          </div>

        </div>
      </div>
          
      <button class="btn button mt-3" @click.prevent="register">Register</button>

    </div>

</div>

</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      user:{
        firstname:"",
        lastname:"",
        phone:"",
        email:"",
        password:"",
        weight:"",
        height:"",
        age:""
      }
    }
  },
  methods: {
    async register(){
      try {
        await this.$http.post("/users", this.user)
        this.$buefy.toast.open({
                    message: 'Congratulations, you account has been created :)',
                    type: 'is-success'
                })

        this.$router.push({ name: "LoginPage" })
      } catch(e){
        this.$buefy.toast.open({
                    message: 'Ups, looks like something went wrong. Please try again later :)',
                    type: 'is-danger'
                })
                
        consol.log(e)
      }
    }
  }
}
</script>