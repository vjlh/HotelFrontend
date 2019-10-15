<template>
<v-container >
  <Buttonnav style="margin-top:-16px"/>  
  <Rack style="margin-top:-3px"/>  
  <Footer/>  
</v-container>
</template>

<script>
import Rack from '../components/Rack';
import Buttonnav from '../components/ButtonNav';
import Footer from '../components/Footer';

export default {
  components: {
    Rack,
    Buttonnav,
    Footer
  },
  mounted(){
    //this.$store.dispatch('fixReservations')
  }
};
</script>
