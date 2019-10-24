<template>
<v-container >
  <Login/>  
</v-container>
</template>

<script>
import Login from '../components/auth/Login';

export default {
  components: {
    Login,
  },
  mounted(){
    //this.$store.dispatch('fixReservations')
  }
};
</script>
