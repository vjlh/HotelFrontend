import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex,Axios)
export default new Vuex.Store({
  state: {
  ownerDataSource:[],
  rooms:[],
  dataSource: [{EventName: "Reserva 2", StartTime:new Date(2019, 9, 18), EndTime:new Date(2019, 9, 29), RoomId:1, id:1, IsAllDay:true, Subject:"Reserva 1"},
              {EventName: "Reserva 1", StartTime:new Date(Date.now()),  EndTime:new Date(2019, 9, 10), RoomId:1, id:2, IsAllDay:true, Subject:"Reserva 2"},
              {EventName: "Reserva 3", StartTime:new Date(2019, 9, 18),  EndTime:new Date(2019, 9, 23), RoomId:2, id:3, IsAllDay:true, Subject:"Reserva 3"},
              {EventName: "Reserva 3", StartTime:new Date(2019, 9, 8),  EndTime:new Date(2019, 9, 28), RoomId:4, id:4, IsAllDay:true, Subject:"Reserva 4"},]
  },
  mutations: {
    async getRooms(state){
      await Axios
        .get('http://157.245.12.218:8181/MingesoBackend/rooms')
        .then(response => (state.ownerDataSource = response.data))
        
        console.log(state.ownerDataSource)
    }

  },
  actions: {
    getRooms (context){
      context.commit('getRooms')
    },
  }
})
