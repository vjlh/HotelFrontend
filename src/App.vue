<template>
<v-img
      :src="require('@/assets/images/background.jpg')"
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
};
</script>