import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ownerDataSource:[
      { text: '1', id: 1, color: '#51d1f6', capacity: 20, type: 'Conference' },
      { text: '2', id: 2, color: '#51d1f6', capacity: 7, type: 'Cabin' },
      { text: '3',id: 3, color: '#51d1f6', capacity: 5, type: 'Cabin' },
      { text: '4', id: 4, color: '#51d1f6', capacity: 15, type: 'Conference' },
      { text: '5', id: 5, color: '#51d1f6', capacity: 25, type: 'Conference' },
      { text: '6', id: 6, color: '#51d1f6', capacity: 10, type: 'Cabin' },
      { text: '7', id: 7, color: '#51d1f6', capacity: 20, type: 'Conference' },
      { text: '8', id: 8, color: '#51d1f6', capacity: 8, type: 'Cabin' },
      { text: '9', id: 9, color: '#51d1f6', capacity: 30, type: 'Conference' },
      { text: '10', id: 10, color: '#51d1f6', capacity: 25, type: 'Conference' },
      { text: '11', id: 11, color: '#51d1f6', capacity: 25, type: 'Conference' },
      { text: '12', id: 12, color: '#51d1f6', capacity: 10, type: 'Cabin' },
      { text: '13', id: 13, color: '#51d1f6', capacity: 20, type: 'Conference' },
      { text: '14', id: 14, color: '#51d1f6', capacity: 8, type: 'Cabin' },
      { text: '15', id: 15, color: '#51d1f6', capacity: 30, type: 'Conference' },
      { text: '16', id: 16, color: '#51d1f6', capacity: 25, type: 'Conference' }   
  ],
  dataSource: [{EventName: "Reserva 2", StartTime:new Date(2019, 9, 18), EndTime:new Date(2019, 9, 29), RoomId:1, id:1, IsAllDay:true, Subject:"Reserva 1"},
              {EventName: "Reserva 1", StartTime:new Date(Date.now()),  EndTime:new Date(2019, 9, 10), RoomId:1, id:2, IsAllDay:true, Subject:"Reserva 2"},
              {EventName: "Reserva 3", StartTime:new Date(2019, 9, 18),  EndTime:new Date(2019, 9, 23), RoomId:2, id:3, IsAllDay:true, Subject:"Reserva 3"},
              {EventName: "Reserva 3", StartTime:new Date(2019, 9, 8),  EndTime:new Date(2019, 9, 28), RoomId:4, id:4, IsAllDay:true, Subject:"Reserva 4"},]
  },
  mutations: {

  },
  actions: {

  }
})
