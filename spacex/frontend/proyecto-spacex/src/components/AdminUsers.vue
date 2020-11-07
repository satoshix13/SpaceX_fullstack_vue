<template>
  <div class="container">
    <div class="columns">
      <!-- Form -->
      <div class="column is-half">
        <h1 class="title is-size-5 has-text-blue">Create a New Account</h1>

        <div class="columns">
          <div class="column is-half">
            <div class="field ">
              <div class="control has-icons-left">
                <input
                  v-model="user.firstname"
                  class="input"
                  type="text"
                  placeholder="Firstname"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="column is-half">
            <div class="field ">
              <div class="control has-icons-left">
                <input
                  v-model="user.lastname"
                  class="input"
                  type="text"
                  placeholder="Lastname"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-half">
            <div class="field ">
              <div class="control has-icons-left">
                <input
                  v-model="user.email"
                  class="input"
                  type="email"
                  placeholder="Email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="column is-half">
            <div class="field ">
              <div class="control has-icons-left">
                <input
                  v-model="user.phone"
                  class="input"
                  type="text"
                  placeholder="Phone"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-mobile-alt"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-halft">
            <div class="field ">
              <div class="control has-icons-left">
                <input
                  v-model="user.weight"
                  class="input"
                  type="number"
                  placeholder="Weight (kg)"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-weight"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="column is-half">
            <div class="field ">
              <div class="control has-icons-left">
                <input
                  v-model="user.height"
                  class="input"
                  type="number"
                  placeholder="Height (cm)"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-arrows-alt-v"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-halft">
            <div class="field ">
              <div class="control has-icons-left">
                <input
                  v-model="user.age"
                  class="input"
                  type="number"
                  placeholder="Age"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-birthday-cake"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="column is-half">
            <div class="field">
              <div class="select is-fullwidth">
                <select name="user_profile" v-model="user.profile" required>
                  <option value="" disabled selected>User profile</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <div class="select is-fullwidth">
                <select
                  name="confirmation_status"
                  v-model="user.confirmation"
                  required
                >
                  <option value="" disabled selected
                    >Confirmation status</option
                  >
                  <option value="true">Accept</option>
                  <option value="false">Decline</option>
                </select>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field ">
              <div class="control has-icons-left">
                <input
                  v-model="user.password"
                  class="input"
                  type="password"
                  placeholder="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!editMode" class="field is-grouped">
          <p  class="control">
            <button class="button is-blue has-text-white" @click.prevent="saveUser">
              Save
            </button>
          </p>
          <p class="control">
            <button  class="button is-light" @click.prevent="cancel">
              Cancel
            </button>
          </p>
        </div>

        <div v-else class="field is-grouped">
          <p  class="control">
            <button class="button is-blue has-text-white" @click.prevent="updateUser">
              Submit Changes
            </button>
          </p>
          <p class="control">
            <button  class="button is-light" @click.prevent="cancelUpdate">
              Go Back
            </button>
          </p>
        </div>

        
      </div>
      

      <div class="column is-half">
        <h1 class="title is-size-5 has-text-blue">Users</h1>
        <button class="button is-coral" @click="listUsers">List Users</button>

        <!-- Card 1 -->
        <div v-show="showUserList">
          <div 
            v-for="user in users" 
            :key="user._id" 
            class="card card-size mt-4"
          >
            <div class="card-content">
              <p class="title is-4">
                {{user.firstname}} 
                <span v-if="!user.confirmation" class="tag is-danger mr-1">Decline</span>
                <span v-if="user.confirmation" class="tag is-success mr-1">Accept</span>
                <span v-if="user.profile === 'user'" class="tag is-link">User</span>
                <span v-if="user.profile === 'admin'" class="tag is-dark">Admin</span>
              </p>
              <table class="table is-fullwidth">
                <tbody>
                  <tr>
                    <th>Email</th>
                    <td>{{user.email}}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{{user.phone}}</td>
                  </tr>
                  <tr>
                    <th>Weight (kg)</th>
                    <td>{{user.weight}}</td>
                  </tr>
                  <tr>
                    <th>Height (cm)</th>
                    <td>{{user.height}}</td>
                  </tr>
                  <tr>
                    <th>Age</th>
                    <td>{{user.age}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click.prevent="editUser(user._id)">Edit</a>
              <a class="card-footer-item" @click.prevent="deleteUser(user._id)">Delete</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminUsers",
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        weight: "",
        height: "",
        age: "",
        profile: "",
        confirmation: "",
      },
      users:[],
      showUserList: false,
      editMode: false,
      user_id:""
    };
  },
  created() {
    this.$http.get("/users",{headers:{Authorization: 'Bearer '+window.localStorage.getItem('token')}}).then((users) => {
      // con reverse invierto el orden del array
      this.users =  users.data.reverse()
    })
  },
  methods: {
    listUsers(){
      this.showUserList = !this.showUserList
    },
    async saveUser() {
      try {
        await this.$http.post("/users", this.user);
        this.users.unshift(this.user)
        this.$buefy.toast.open({
                    message: 'New user has been created!',
                    type: 'is-success'
                })

      } catch (e) {
        console.log(e);
        this.$buefy.toast.open({
                    message: 'Ups, looks like something went wrong. Please try again later :)',
                    type: 'is-danger'
                })
      }
    },
    clearFields(){
     this.user = {}

    },
    cancel(){
      this.clearFields()
    },
    async editUser(id){
      this.editMode = true
      const index = this.users.findIndex((user)=> user._id === id)
      let user = this.users[index]
      this.user = user
      this.user_id = id
    },
    
    async deleteUser(id){
      try{
        await this.$http.delete("/users/"+id)
        const userIndex = this.users.findIndex(user => user._id === id)
        this.users.splice(userIndex,1)
        this.$buefy.toast.open({
                    message: 'User has been deleted'
                })

      }catch(e){
        console.log(e)
      }
    },
    cancelUpdate(){
      this.clearFields()
      this.editMode = false
    },
    async updateUser(){
      let id = this.user_id
      let updatedUser = this.user
      try{
        await this.$http.put("/users/"+id, updatedUser)
        this.$buefy.toast.open({
                    message: 'User has been updated!',
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
};
</script>
