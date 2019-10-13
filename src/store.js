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
              {EventName: "Reserva 3", StartTime:new Date(2019, 9, 8),  EndTime:new Date(2019, 9, 28), RoomId:4, id:4, IsAllDay:true, Subject:"Reserva 4"}],
  preReservations:[],
  reservations:[]
              
  },

  mutations: {
    async getRooms(state){
      await Axios
        .get('http://157.245.12.218:8181/MingesoBackend/rooms')
        .then(response => (state.ownerDataSource = response.data))
        
        console.log(state.ownerDataSource)
    },
    async getReservations(state){
      state.reservations = []
      await Axios
        .get('http://157.245.12.218:8181/MingesoBackend/reservationrooms')
        .then(response => (state.preReservations = response.data))
        console.log(state.preReservations)
        for (let index = 0; index < state.preReservations.length; index++) {
          var reservationHolder = state.preReservations[index].reservation.reservationHolder.name
          var startTime = state.preReservations[index].arrivalDate
          var endTime = state.preReservations[index].departureDate
          var roomId = state.preReservations[index].room.id
          var id = state.preReservations[index].id
          var color = ""
          if(state.preReservations[index])
            color = "#551a8b"
          else
            color = "#008B00"  
          var reserva = {EventName: reservationHolder, StartTime:startTime,  EndTime:endTime, RoomId:roomId, id:id, IsAllDay:true, Subject:reservationHolder, color: color}
          console.log(reserva)
  
          state.reservations.push(reserva)
          }
          console.log(state.reservations)
          console.log('algo')
    },  
  },
  actions: {
    getRooms (context){
      context.commit('getRooms')
    },
    getReservations (context){
      context.commit('getReservations')
    },
    /*fixReservations (context){
      context.commit('fixReservations')
    },*/
  }
})
