<template>
  <v-img
    :src="require('./assets/images/hotel.jpeg')"
  >
    <v-app  style="background: #0000">
      <Sidebar/>                
    </v-app>
  </v-img>
</template>

<script>
import Sidebar from './components/Sidebar'
export default {
  name: 'App',
  components:{
    Sidebar
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