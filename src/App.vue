<template>
<v-img
      :src="require('@/assets/images/background.jpg')"
    >
  <v-app  style="background: #0000">
    <v-layout>
      <v-flex md3>
        <Sidebar/>        
      </v-flex>
      <v-flex md9>
        <v-content>
          <router-view/>
        </v-content>
      </v-flex>
    </v-layout>
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