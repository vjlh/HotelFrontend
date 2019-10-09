<template>
<v-container>
    <v-bottom-navigation
      light
    >
      <v-btn v-on:click="dialog=true">
        <span>Nueva Reserva</span>
        <v-icon>mdi-calendar-plus</v-icon>
      </v-btn>

      <v-btn>
        <span>Nueva habitación</span>
        <v-icon>mdi-hotel</v-icon>
      </v-btn>

    </v-bottom-navigation>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Nueva Reserva</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <label>Datos del reservante</label>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Nombre*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellido*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>

            </v-row>
              <label>Datos de la reserva</label>

            <v-row>
              <v-col cols="12" sm="7">
                <v-date-picker v-model="date" range></v-date-picker>
              </v-col>
              
              <v-col cols="12" sm="5">
                <v-autocomplete
                  :items="rooms"
                  label="Habitación"
                  v-model="habitaciones"
                  multiple
                ></v-autocomplete>
                <VBtn @click="agregarFecha"><v-icon>mdi-plus</v-icon>Agregar Reserva</VBtn>
                
                <v-card
                style="margin-top:10px"
                  v-for="item in reservas" v-bind:key="item.habitacion"
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
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Añadir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-container>

</template>
<script>
  import {mapState, mapMutations} from 'vuex';
  export default {
    data () {
      return {
        dialog: false,
        date: [],
        reservas:[],
        habitaciones: []
      }
    },

    computed: {
      ...mapState(['ownerDataSource']),
      
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
    },
  }
</script>