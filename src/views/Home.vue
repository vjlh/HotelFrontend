<template>
<v-container >
  <Buttonnav style="margin-top:-5px"/>  
  <Rack />  
  <Footer/>  
</v-container>
</template>

<script>
import Rack from '../components/Home/Rack';
import Buttonnav from '../components/Home/ButtonNav';
import Footer from '../components/Home/Footer';

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
