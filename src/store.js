import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';
import { reject } from 'q';

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
  reservations:[],
  auth: localStorage.getItem('currentUser') || null,
              
  },
  getters:{
    loggedIn(state){
      return state.auth != null
    }
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
        .then(response => (state.preReservations = response.data));

        for (let index = 0; index < state.preReservations.length; index++) {
          var reservationHolder = state.preReservations[index].reservation.reservationHolder.name
          var startTime = new Date(state.preReservations[index].arrivalDate)
          var endTime = new Date(state.preReservations[index].departureDate)
          var roomId = state.preReservations[index].room.id
          var id = state.preReservations[index].id
          endTime.setDate(endTime.getDate()+1)

          var color = ""
          if(state.preReservations[index].checkIn)
            color = '#D81B60'
          else
            color = '#40C4FF'  
          var reserva = {EventName: reservationHolder, StartTime:startTime,  EndTime:endTime, RoomId:roomId, id:id, IsAllDay:true, Subject:reservationHolder, Color: color}
          state.reservations.push(reserva)
          }
          console.log(state.reservations)
    },  
    retrieveUser(state,auth){
      state.auth = auth

    },
    destroyUser(state){
      localStorage.removeItem('currentUser')
      state.auth = null

    }
  },
  actions: {
    retrieveUser(context, credentials){
      return new Promise((resolve,reject) => {
        Axios.get('http://localhost:8090/users/login',{
          params:{
          username: credentials.username,
          password: credentials.password
          }
        })
        .then(response => {
          console.log(response.data)
          const auth = response.data
          localStorage.setItem('currentUser',auth)
          context.commit('retrieveUser',auth)
          resolve(response) 
        })
        .catch(error => {
          //console.log(error)
          reject(error)
        })
      })
    },
    destroyUser(context){
      if(context.getters.loggedIn){
        context.commit('destroyUser')
      }
      
    },
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
