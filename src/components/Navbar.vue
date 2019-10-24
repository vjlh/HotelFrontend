<template>
 <div>
      <v-toolbar
        elevation=10
        height=50
        dark
        tile>
        <v-toolbar-title><v-btn x-large depressed to="/"><VIcon left>mdi-hospital-building</VIcon> HotelG5 2019</v-btn></v-toolbar-title>
  
        <div class="flex-grow-1"></div>
  
        <v-toolbar-items >
          <v-btn v-if="loggedIn" text to="/"><v-icon left>mdi-calendar-month</v-icon>Rack</v-btn>
          <v-btn v-if="loggedIn" disabled text to="/about"><v-icon left>mdi-hotel</v-icon>Habitaciones</v-btn>
          <v-btn v-if="loggedIn" text @click="logout"><v-icon left>mdi-logout</v-icon>Log out</v-btn>
        </v-toolbar-items>

      </v-toolbar>
      <v-content>
      <router-view/>
    </v-content>
  </div>
</template>
<script>
export default {
  computed:{
    loggedIn(){
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('destroyUser')
      .then(response => {
        this.$router.push({name:'login'})
      })
    }
  },
}
</script>