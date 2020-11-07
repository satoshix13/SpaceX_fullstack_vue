<template>
    <div class="columns">
        
        <!-- Form -->
        <div class="column is-half">
              <h1 class="title is-size-5 has-text-blue">Add a New Spacecraft</h1>

              <div class="columns">
                <div class="column is-half">
                  <div class="field ">
                  <div class="control has-icons-left">
                    <input 
                      v-model="spacecraft.name"
                      class="input" 
                      type="text" 
                      placeholder="Name"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-rocket"></i>
                    </span>
                  </div>
                  </div>
                </div>

                 <div class="column is-half">
                <div class="field ">
                  <div class="control has-icons-left">
                    <input 
                      v-model="spacecraft.image"
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
                  <div class="control has-icons-left">
                    <input 
                      v-model="spacecraft.max_load"
                      class="input" 
                      type="number" 
                      placeholder="Maximum Load (kg)"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-weight-hanging"></i>
                    </span>
                  </div>
                  </div>
                </div>

                <div class="column is-half">
                  <div class="field ">
                  <div class="control has-icons-left">
                    <input 
                      v-model="spacecraft.height"
                      class="input" 
                      type="number" 
                      placeholder="Height (m)"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-arrows-alt-v"></i>
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
                      v-model="spacecraft.diameter"
                      class="input" 
                      type="number" 
                      placeholder="Diameter (m)"
                    />
                    <span class="icon is-small is-left">
                      <i class="far fa-circle"></i>
                    </span>
                  </div>
                  </div>
                </div>

                 <div class="column is-half">
                <div class="field ">
                  <div class="control has-icons-left">
                    <input 
                      v-model="spacecraft.passengers"
                      class="input" 
                      type="number" 
                      placeholder="Passengers"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-users"></i>
                    </span>
                  </div>
                  </div>
                </div>
              </div>

              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                  <div class="select is-fullwidth">
                    <select
                      v-model="spacecraft.mood"
                    >
                      <option value="" disabled selected>Mood</option>
                      <option value="free">Free</option>
                      <option value="in orbit">In Orbit</option>
                    </select>
                  </div>
                  </div>
                </div>

                <div class="column is-half">
                  <div class="field">
                  <div class="select is-fullwidth">
                    <select
                      v-model="spacecraft.state"
                    >
                      <option value="" disabled selected>State</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  </div>
                </div>
              </div>

              <div class="columns">
                <div class="column is-halft">
                  <div class="field ">
                  <div class="control">
                    <textarea
                      v-model="spacecraft.description" 
                      class="textarea" 
                      placeholder="Description"
                      ></textarea>
                  </div>
                  </div>
                </div>
              </div>

              <div v-if="!editMode" class="field is-grouped">
                <p class="control">
                  <button class="button is-blue has-text-white"  @click.prevent="saveSpacecraft">
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
                  <button class="button is-blue has-text-white"  @click.prevent="updateSpacecraft">
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
              <h1 class="title is-size-5 has-text-blue">Spacecrafts</h1>
              <button class="button is-coral" @click="listSpacecrafts">List Spacecrafts</button>
              
              <!-- Card 1 -->
              <div v-show="showSpacecraftList">
                <div
                  v-for="spacecraft in spacecrafts" 
                  :key="spacecraft._id" 
                  class="card card-size mt-4"
                >
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-128x128">
                          <img :src="spacecraft.image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-4"> {{spacecraft.name}} </p>
                        <p class="subtitle is-6">
                          <span v-if="spacecraft.state === 'active'" class="tag is-success mr-1">Active</span>
                          <span v-if="spacecraft.state === 'inactive'" class="tag is-danger mr-1">Inactive</span>
                          <span v-if="spacecraft.mood === 'free'" class="tag is-dark">Free</span>
                          <span v-if="spacecraft.mood === 'in orbit'" class="tag is-link">In Orbit</span>
                        </p>
                      </div>
                    </div>
                    <table class="table is-fullwidth">
                        <tbody>
                          <tr>
                            <th>Maximum Load (kg)</th>
                            <td> {{spacecraft.max_load}} </td>
                          </tr>
                          <tr>
                            <th>Height (m)</th>
                            <td> {{spacecraft.height}} </td>
                          </tr>
                           <tr>
                            <th>Diameter (m)</th>
                            <td> {{spacecraft.diameter}} </td>
                          </tr>
                           <tr>
                            <th>Passengers</th>
                            <td> {{spacecraft.passengers}} </td>
                          </tr>
                           <tr>
                            <th>Description</th>
                            <td> {{spacecraft.description}} </td>
                          </tr>
                        </tbody>
                    </table> 
                  </div>
                  <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click.prevent="editSpacecraft(spacecraft._id)">Edit</a>
                    <a href="#" class="card-footer-item" @click.prevent="deleteSpacecraft(spacecraft._id)">Delete</a>
                  </footer>
                </div>

              </div>

        </div>
    </div>
</template>


<script>
export default {
  name: 'AdminSpacecrafts',
  data() {
    return {
      spacecraft: {
        name: "",
        image: "",
        max_load: "",
        height: "",
        diameter: "",
        passengers: "",
        description: "",
        mood: "",
        state: "",
      },
      spacecrafts:[],
      showSpacecraftList: false,
      editMode: false,
      spacecraft_id:""
    };
  },
  created() {
    this.$http.get("/spacecrafts").then((spacecrafts) => {
      // con reverse invierto el orden del array
      this.spacecrafts =  spacecrafts.data.reverse()
    })
  },
  methods: {
    listSpacecrafts(){
      this.showSpacecraftList = !this.showSpacecraftList
    },
    async saveSpacecraft() {
      try {
        await this.$http.post("/spacecrafts", this.spacecraft);
        this.spacecrafts.unshift(this.spacecraft)
        this.$buefy.toast.open({
                    message: 'New spacecraft has been added',
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
     this.spacecraft = {}
    },
    cancel(){
      this.clearFields()
    },
    async deleteSpacecraft(id){
      try{
        await this.$http.delete("/spacecrafts/"+id)
        const spacecraftIndex = this.spacecrafts.findIndex(spacecraft => spacecraft._id === id)
        this.spacecrafts.splice(spacecraftIndex,1)
        this.$buefy.toast.open({
                    message: 'Spacecraft has been deleted'
                })
      }catch(e){
        console.log(e)
      }
    },
    async editSpacecraft(id){
      this.editMode = true
      const index = this.spacecrafts.findIndex((spacecraft)=> spacecraft._id === id)
      let spacecraft = this.spacecrafts[index]
      this.spacecraft = spacecraft
      this.spacecraft_id = id
    },
    cancelUpdate(){
      this.clearFields()
      this.editMode = false
    },
    async updateSpacecraft(){
      let id = this.spacecraft_id
      let updatedSpacecraft = this.spacecraft
      try{
        await this.$http.put("/spacecrafts/"+id, updatedSpacecraft)
        this.$buefy.toast.open({
                    message: 'Spacecraft has been updated!',
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