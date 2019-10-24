<template>
  <v-img
    :src="require('./assets/images/hotel.jpeg')"
  >
    <v-app  style="background: #0000">
      <Navbar/>                
    </v-app>
  </v-img>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components:{
    Navbar
  },
  data: () => ({
    //
  }),
  beforeCreate(){
    this.$store.dispatch('getRooms')
    this.$store.dispatch('getReservations')
  }
};
</script>