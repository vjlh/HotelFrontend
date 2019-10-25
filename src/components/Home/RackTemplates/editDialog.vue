<template>
    <v-dialog eager v-model="editRoomDialog" persistent max-width="600px">
    <v-card>
      <v-img
      class="white--text align-end"
      height="200px"
      src="https://static.hotel-imagenes.info/uploads/hotel/82861/photo/iberostar-grand-hotel-packard_15517349006.jpeg"
      >
        <v-card-title> 
          <span class="headline">Modificar Habitación</span>
        </v-card-title>
      </v-img>
      
        <v-card-text>
        <v-container>
            <v-row>
        <v-col cols="12" md="4">
            <v-text-field
                label="Número"
                v-model="currentRoomEdit.id"
                outlined
                disabled
            ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="currentRoomEdit.type"
                :items="availableTypes"
                label="Tipo"
                @input="setCapacity"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                label="Capacidad"
                v-model="currentRoomEdit.capacity"
                outlined
                disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field
                label="Precio"
                v-model="currentRoomEdit.price"
                outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-select
                v-model="currentRoomEdit.status"
                :items="availableStatus"
                label="Estado"
                item-text="text"
                item-value="value"
                outlined
                
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
              outlined
              name="input-7-4"
              label="Outlined textarea"
              v-model="currentRoomEdit.features"
            ></v-textarea>
            </v-col>
            </v-row>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="change({room:{},status:false})">Close</v-btn>
        <v-btn color="blue darken-1" text @click="change({room:{},status:false})">Save</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      currentRoomEdit:{},
      availableTypes:['Simple','Doble','Triple','Cuadruple','Matrimonial'],
      availableStatus:[
        {value:true, text:'Disponible'},
        {value:false,text:'Mantención'}]
    }
  },
  methods:{
    ...mapMutations(['change']),
    setCapacity(){
      console.log('entra')
      var currentType = this.currentRoomEdit.type
      var newCapacity = this.currentRoomEdit.capacity
      if(currentType == 'Simple')
        newCapacity = 1
      else if(currentType == 'Doble' || currentType == 'Matrimonial')
        newCapacity = 2
      else if(currentType == 'Triple')
        newCapacity = 3
      else if(currentType == 'Cuadruple')
        newCapacity = 4  
      this.currentRoomEdit.capacity = newCapacity   
    }
  },
  computed:{
    ...mapState(['editRoomDialog','currentRoom'])
  },
  watch:{
    editRoomDialog: function(){
      /*if(editRoomDialog){
        availableTypes.forEach(function(type) {
          if(this.currentRoom.type === type)
            this.currentRoomEdit.type = type
        });
      }*/
      this.currentRoomEdit = this.currentRoom
    },
    
  }

};
</script>
