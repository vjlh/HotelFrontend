<template>
<v-container style="">
  <Buttonnav/>  
  <Rack style="margin-top:10px"/>  
</v-container>
</template>

<script>
import Rack from '../components/Rack';
import Buttonnav from '../components/ButtonNav';

export default {
  components: {
    Rack,
    Buttonnav
  },
};
</script>
