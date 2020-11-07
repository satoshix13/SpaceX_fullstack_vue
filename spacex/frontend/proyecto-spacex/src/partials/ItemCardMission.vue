<template>
<div class="column is-4">
  <div class="card has-background-blue">
    <div class="card-content">
      <p class="title is-4 has-text-white">
        {{mission.name}}
        <span class="tag is-success mr-1">{{mission.passengers.length}}/{{mission.spacecraft.passengers}}</span>
      </p>
      <table class="table is-fullwidth has-background-blue">
        <tbody>
            <tr>
            <th>Created By:</th>
            <td> {{mission.creator.firstname}} {{mission.creator.lastname}} </td>
          </tr>
          <tr>
            <th>Destination:</th>
            <td> {{mission.destination.name}} </td>
          </tr>
          <tr>
            <th>Depart:</th>
            <td> {{ mission.depart | toDateOnly }} </td>
          </tr>
          <tr>
            <th>Return:</th>
            <td> {{ mission.return | toDateOnly }} </td>
          </tr>
          <tr>
            <th>Spacecraft:</th>
            <td> {{mission.spacecraft.name}} </td>
          </tr>
          <tr>
            <th>Description:</th>
            <td> {{mission.description}} </td>
          </tr>
        </tbody>
      </table>
      <button class="button is-blue has-text-white" @submit.prevent="$emit('submit', mission._id)">REGISTER</button>
      <button class="button is-danger" @click.prevent="$emit('click', mission._id)">DELETE</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ItemCardMission",
   props: {
    mission: {
      type: Object,
      default: {
        _id: "",
        creator: "",
        passengers: "",
        name: "",
        description: "",
        destination: "",
        depart: "",
        return: ""
      },
    },
  },
}
</script>