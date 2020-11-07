<template>
   <div class="columns">
        
        <!-- Form -->
        <div class="column is-half">
              <h1 class="title is-size-5 has-text-blue">Add a New Destination</h1>

              <div class="columns">
                <div class="column is-half">
                  <div class="field ">
                  <div class="control has-icons-left">
                    <input 
                      v-model="destination.name"
                      class="input" 
                      type="text" 
                      placeholder="Name"
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
                      v-model="destination.image"
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
                      v-model="destination.distance"
                      class="input" 
                      type="number" 
                      placeholder="Distance (million km)"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-arrows-alt-h"></i>
                    </span>
                  </div>
                  </div>
                </div>

                <div class="column is-half">
                  <div class="field ">
                  <div class="control has-icons-left">
                    <input 
                      v-model="destination._length"
                      class="input" 
                      type="number" 
                      placeholder="Length (hours)"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-clock"></i>
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
                      v-model="destination.state"
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
                      v-model="destination.description"
                      class="textarea" 
                      placeholder="Description"
                    ></textarea>
                  </div>
                  </div>
                </div>
              </div>

              <div v-if="!editMode" class="field is-grouped">
                <p class="control">
                  <button class="button is-blue has-text-white" @click.prevent="saveDestination">
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
                  <button class="button is-blue has-text-white"  @click.prevent="updateDestination">
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
              <h1 class="title is-size-5 has-text-blue">Destinations</h1>
              <button class="button is-coral" @click="listDestinations">List Destinations</button>
              
              <!-- Card 1 -->
              <div v-show="showDestinationList">
                <div 
                  v-for="destination in destinations" 
                  :key="destination._id"
                  class="card card-size mt-4"
                >
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-128x128">
                          <img :src="destination.image" alt="Placeholder image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-4"> {{destination.name}} </p>
                        <p class="subtitle is-6"><span class="tag is-success">Active</span></p>
                      </div>
                    </div>
                    <table class="table is-fullwidth">
                        <tbody>
                          <tr>
                            <th>Distance (km)</th>
                            <td> {{destination.distance}} </td>
                          </tr>
                          <tr>
                            <th>Length (hours)</th>
                            <td> {{destination._length}} </td>
                          </tr>
                           <tr>
                            <th>Description</th>
                            <td> {{destination.description}} </td>
                          </tr>
                        </tbody>
                    </table> 
                  </div>
                  <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click.prevent="editDestination(destination._id)">Edit</a>
                    <a href="#" class="card-footer-item" @click.prevent="deleteDestination(destination._id)">Delete</a>
                  </footer>
                </div>

              </div>

        </div>
    </div>
</template>


<script>
export default {
  name: 'AdminDestinations',
  data() {
    return {
      destination: {
        name: "",
        image: "",
        distance: "",
        _length: "",
        description: "",
        state: "",
      },
      destinations:[],
      showDestinationList: false,
      editMode: false,
      destination_id:""
    };
  },
  created() {
    this.$http.get("/destinations").then((destinations) => {
      // con reverse invierto el orden del array
      this.destinations =  destinations.data.reverse()
    })
  },
  methods: {
    listDestinations(){
      this.showDestinationList = !this.showDestinationList
    },
    async saveDestination() {
      try {
        await this.$http.post("/destinations", this.destination);
        this.destinations.unshift(this.destination)
        this.$buefy.toast.open({
                    message: 'New destination has been added!',
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
     this.destination = {}
    },
    cancel(){
      this.clearFields()
    },
    async deleteDestination(id){
      try{
        await this.$http.delete("/destinations/"+id)
        const destinationIndex = this.destinations.findIndex(destination => destination._id === id)
        this.destinations.splice(destinationIndex,1)
        this.$buefy.toast.open({
                    message: 'Destination has been deleted'
                })
      }catch(e){
        console.log(e)
        this.$buefy.toast.open({
                    message: 'Ups, looks like something went wrong. Please try again later :)',
                    type: 'is-danger'
                })
      }
    },
    async editDestination(id){
      this.editMode = true
      const index = this.destinations.findIndex((destination)=> destination._id === id)
      let destination = this.destinations[index]
      this.destination = destination
      this.destination_id = id
    },
    cancelUpdate(){
      this.clearFields()
      this.editMode = false
    },
    async updateDestination(){
      let id = this.destination_id
      let updatedDestination = this.destination
      try{
        await this.$http.put("/destinations/"+id, updatedDestination)
        this.$buefy.toast.open({
                    message: 'Destination has been updated!',
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