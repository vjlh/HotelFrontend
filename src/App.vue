<template>
  <v-app  style="background: #0000">
    <Sidebar/>                
  </v-app>
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
};
</script>