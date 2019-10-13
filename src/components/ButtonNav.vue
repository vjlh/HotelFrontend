<template>
<v-container>
    <v-bottom-navigation
      light
    >
      <v-btn v-on:click="dialog=true">
        <span>Nueva Reserva</span>
        <v-icon>mdi-calendar-plus</v-icon>
      </v-btn>

      <v-btn disabled>
        <span>Nueva habitación</span>
        <v-icon>mdi-hotel</v-icon>
      </v-btn>

    </v-bottom-navigation>
    <v-dialog 
      v-model="dialog" 
      persistent 
      max-width="600px"      
      >
      <v-card>
      <v-img
      class="white--text align-end"
      height="200px"
      src="https://static.hotel-imagenes.info/uploads/hotel/82861/photo/iberostar-grand-hotel-packard_15517349006.jpeg"
      >
        <v-card-title> 
          <span class="headline">Nueva Reserva</span>
        </v-card-title>
      </v-img>
      <v-form
      ref="form"
      v-model="valid"
      >
        <v-card-text>
          <v-container>
            <label>Datos del reservante</label>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field 
                label="Nombre"
                v-model="name"
                required
                prepend-icon="mdi-account-outline"
                :rules="nameRules">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Rut"
                  v-model="rut"
                  :rules="rutRules"
                  prepend-icon="mdi-account-card-details-outline"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                  label="Correo" 
                  v-model="email"
                  required
                  prepend-icon="mdi-at"
                  :rules="emailRules"
                  ></v-text-field>
              </v-col>

            </v-row>
              <label>Datos de la reserva</label>

            <v-row>
              <v-col cols="12" sm="7">
                <v-date-picker 
                  v-model="date" 
                  range
                  light
                  color="#0091EA"
                  ></v-date-picker>
              </v-col>
              
              <v-col cols="12" sm="5">
                <v-autocomplete
                  v-model="type"
                  :items="rooms"
                  item-text="type"
                  item-value="id"
                  label="Tipo"
                  light
                >
              </v-autocomplete>
                <v-autocomplete
                  v-model="habitaciones"
                  :items="ownerDataSource"
                  item-text="id"
                  item-value="id"
                  label="Habitación"
                  chips
                  multiple
                  light
                >
                  <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    dark
                    @click="data.select"
                    @click:close="remove(data.item)"
                    color="#0091EA"
                    
                  >
                    <v-icon left>mdi-hotel</v-icon>
                    {{ data.item.id }}
                  </v-chip>
                </template>
              </v-autocomplete>
                <VBtn 
                @click="agregarFecha" 
                color="#0091EA"
                dark
                ><v-icon>mdi-plus</v-icon>Agregar Reserva</VBtn>
                
                <v-card
                style="margin-top:10px"
                v-for="item in reservas" 
                v-bind:key="item.habitacion"
                light
                >
                <v-list dense>
                  <v-list-item-group>
                    <v-list-item
                    >
                      <v-list-item-icon>
                        <v-icon left >mdi-calendar-today</v-icon> Inicio:
                      </v-list-item-icon>
                      <v-list-item-content >
                        <v-list-item-title class="text-right" v-text="item.Fechai"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon left>mdi-calendar</v-icon>Fin:
                      </v-list-item-icon>
                      <v-list-item-content >
                        <v-list-item-title class="text-right" v-text="item.Fechaf"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon left>mdi-hotel</v-icon>Habitación
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-right" v-text="item.Habitacion"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list-item-group>
                </v-list>              </v-card>
              </v-col>
              
            </v-row>
          </v-container>
        </v-card-text>
      </v-form>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
          Guardar
          </v-btn>
          <v-btn color="error"  @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-container>

</template>
<script>
  import {mapState, mapMutations} from 'vuex';
  import axios from 'axios'
import { log } from 'util';
  export default {
    data () {
      return {
        name:"",
        rut:"",
        email:"",
        holder:{},
        type:[],
        filteredRooms:[],
        rooms:[
          {id:0, type:"Simple"},
          {id:1, type:"Doble"},
          {id:2, type:"Triple"},
          {id:3, type:"Cuadruple"},
          {id:4, type:"Matrimonial"}
        ],
        dialog: false,
        valid: true,
        date: [],
        reservas:[],
        habitaciones: [],
        nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 20) || 'No puede ingresar más de 15 carácteres'
        ],
        emailRules: [
        v => !!v || 'El correo es requerido',
        v => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
        ],
        rutRules: [
        v => !!v || 'El rut es requerido',
        v => (v && v.length <= 20) || 'No puede ingresar más de 15 carácteres',
      ],
      }
    },

    computed: {
      ...mapState(['ownerDataSource','dataSource']),
      
    },
    methods: {
      agregarFecha(){
        var fechai = this.date[0]
        var fechaf = this.date[1]
        for (let i = 0; i < this.habitaciones.length; i++) {
          var datos = {Fechai: fechai, Fechaf: fechaf, Habitacion:this.habitaciones[i]}
          this.reservas.push(datos)
        }        
        this.date = []
        this.habitaciones = []
        console.log(this.reservas)
      },
      remove (item) {
        const index = this.habitaciones.indexOf(item.id)
        if (index >= 0) this.habitaciones.splice(index, 1)
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      async createReservation() {
        console.log(this.name)
        console.log(this.rut)
        console.log(this.email)
        /*var id = 0

        axios.post('http://157.245.12.218:8181/MingesoBackend/reservationHolders', 
        {
          name: this.name,
          rut: this.rut,
          email: this.email,
        }
        ).then(response => {
        (console.log(response.data.id))
        }).catch(e => {
          console.log(e);
        });
        console.log(this.holder)
        */
        //this.reset()
        }
    },
    watch: {
      date: function(){
        if(this.date.length)
        var fechai = this.date[0]
        var fechaf = this.date[0]
  
        log(fechai)
        log(fechaf)
      }
      
    },
  }
</script>