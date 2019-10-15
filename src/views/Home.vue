<template>
<v-container >
  <Buttonnav style="margin-top:-5px"/>  
  <Rack />  
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
