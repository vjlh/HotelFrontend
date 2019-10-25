<template>
  <div>

    <div class='template-wrap'>
      <div class="room-actions">
        <v-btn @click="editRoom($data.data.resourceData)" tile outlined fab x-small rigth color="primary">
          <v-icon >mdi-pencil</v-icon>
        </v-btn>
      </div>
      <div class="room-name">{{$data.data.resourceData.id}}</div>
      <div class="room-type">{{$data.data.resourceData.type}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapMutations } from 'vuex'
import Vuex from 'vuex'
import store from '@/store.js'
Vue.use(Vuex);
export default {
  data() {
    return {
    }
  },
  methods:{
    editRoom(room){
      store.dispatch('change',{
        room: room,
        status: true}
      )
    },
  },
  computed:{

  },
  mounted(){
    console.log("está montado")
  }
}
</script>