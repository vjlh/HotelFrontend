<template>
<v-container>
  <v-snackbar
      v-model="show"
      color="success"
      :timeout="timeout"
      top
    >
      La reserva se ha guardado exitósamente
      <v-btn
        dark
        text
        @click="show = false"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="showError"
      color="error"
      :timeout="timeout"
      top
    >
      La reserva no se ha podido guardar, intente más tarde
      <v-btn
        dark
        text
        @click="showError = false"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-snackbar>

    <v-bottom-navigation
      color="primary"
    >
      <v-btn id="nuevaReserva" v-on:click="dialog=true">
        <span style="color:#000">Nueva Reserva</span>
        <v-icon color="primary">mdi-calendar-plus</v-icon>
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
                <!--Campo para el nombre-->
                <v-text-field 
                id = "nuevaReservaNombre"
                label="Nombre"
                v-model="name"
                required
                outlined
                prepend-icon="mdi-account-outline"
                :rules="nameRules">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
              <!--Campo para el rut-->
                <v-text-field
                  id = "nuevaReservaRut"
                  label="Rut"
                  v-mask="mask"
                  v-model="rut"
                  :rules="rutRules"
                  counter = "12"
                  maxlength="12"
                  outlined
                  prepend-icon="mdi-account-card-details-outline"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
              <!--Campo para el correo-->
                <v-text-field 
                  id = "nuevaReservaCorreo"
                  label="Correo" 
                  v-model="email"
                  required
                  outlined
                  prepend-icon="mdi-at"
                  counter = "50"
                  maxlength="50"
                  
                  :rules="emailRules"
                  ></v-text-field>
              </v-col>

            </v-row>
              <label>Datos de la reserva</label>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon right color="primary" v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                <span>Para escoger un rango de fechas para una reserva, debe seleccionar un dia de inicio y un dia de fin,</span><br/>
                <span>las habitaciones disponibles se cargaran unicamente cuando se tenga el rango escogido, pudiendo</span><br/>
                <span>asignar multiples habitaciones para el mismo rango de fechas. Seleccionadas las habitaciones</span><br/>
                
                <span>se oprime </span><v-btn x-small color="primary">+ añadir a la reserva</v-btn><span> y el calendario queda disponible para otra nueva selección</span><br/><br/>
                <span>Cuando se tengan todas las habitaciones con sus respectivas fechas, debe oprimir </span>
                <v-btn x-small color="success">Guardar</v-btn> <span> para</span><br/>
                <span>generar la reserva</span>
    
              </v-tooltip>

            <v-row>
              <v-col cols="12" sm="7">
                <v-date-picker 
                  id = "nuevaReservaCalendario"
                  v-model="date" 
                  range
                  light
                  required
                  color="#0091EA"
                  :min="min"
                  ></v-date-picker>
              </v-col>
              
              <v-col cols="12" sm="5">
                <!--<v-autocomplete
                id = "nuevaReservaTipo"
                  v-model="type"
                  :items="rooms"
                  item-text="type"
                  item-value="id"
                  label="Tipo"
                  light
                >
              </v-autocomplete>-->
                <v-autocomplete 
                id = "nuevaReservaHabitaciones"
                  v-model="habitaciones"
                  :items="availableRooms"
                  item-value="id"
                  :item-text="infoRoom"
                  label="Habitación"
                  close
                  multiple
                  light
                  outlined
                  :disabled="!roomStatus"
                  required
                  :loading="loading"
                  prepend-inner-icon="mdi-hotel"
                  no-data-text="La información se está cargando"


                >
                  <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    dark
                    small
                    @click="data.select"
                    @click:close="remove(data.item)"
                    color="#0091EA"  
                  >
                    <v-icon left>mdi-hotel</v-icon>
                    {{ data.item.id }}
                  </v-chip>
                  </template>
                </v-autocomplete >
                <VBtn 
                class="white--text"
                :disabled="addStatus"
                id = "nuevaReservaAgregar"
                @click="agregarFecha" 
                color="#0091EA"
                ><v-icon>mdi-plus</v-icon>Añadir a la reserva</VBtn>
                <v-card
                style="margin-top:10px"
                v-for="item in reservasFront" 
                v-bind:key="item.habitacion"
                light
                >
                <v-list dense>
                  <v-list-item-group>
                    <v-btn text small icon @click="deleteReservation(item)"><v-icon color="error" >mdi-delete-forever</v-icon></v-btn>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon left color="primary">mdi-calendar-today</v-icon> Inicio:
                      </v-list-item-icon>
                      <v-list-item-content >
                        <v-list-item-title class="text-right" v-text="item.Fechai"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon left color="primary">mdi-calendar</v-icon>Fin:
                      </v-list-item-icon>
                      <v-list-item-content >
                        <v-list-item-title class="text-right" v-text="item.Fechaf"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon left color="primary">mdi-hotel</v-icon>Habitación
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-right" v-text="item.Habitacion"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list-item-group>
                </v-list> </v-card>
              </v-col>
              
            </v-row>
          </v-container>
        </v-card-text>
      </v-form>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            id = "nuevaReservaGuardar"
            :disabled="!(fullField ==false && !valid == false)"
            color="success"
            class="mr-4"
            @click="createReservation"
          >
          Guardar
          </v-btn>
          <v-btn color="error" @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-dialog
      v-model="reservanding"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Se está generando la reserva
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</v-container>

</template>
<script>
  import {mapState, mapMutations} from 'vuex';
  import axios from 'axios'
  import { log } from 'util';
  import { mask } from 'vue-the-mask';
  export default {
    directives: {
      mask,
    },
    data () {
      return {
        reservanding: false,
        id: "",
        loading:false,
        i:0,
        timeout: 3000,
        show:false,
        showError:false,
        availableRooms:[],
        valid: true,
        fullField: true,
        name:"",
        rut:"",
        email:"",
        roomStatus: false,
        addStatus: true,
        holder:{},
        mask :"##.###.###-#",
        type:[],
        min: new Date(Date.now()).toISOString().substring(0,10),
        rooms:[
          {id:0, type:"Simple"},
          {id:1, type:"Doble"},
          {id:2, type:"Triple"},
          {id:3, type:"Cuadruple"},
          {id:4, type:"Matrimonial"}
        ],
        dialog: false,
        date: [],
        reservasFront:[],
        reservasBack:"",
        habitaciones: [],
        nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 20) || 'No puede ingresar más de 20 carácteres',
        v => this.haveNumber(v) || 'El nombre solo puede contener letras'
        ],
        emailRules: [
        v => !!v || 'El correo es requerido',
        v => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
        ],
        rutRules: [
        v => !!v || 'El rut es requerido',
        v => ( this.ValidaRut(v) && v.length > 10 && v.length <= 12) || 'El rut ingresado no es válido',
      ],
      }
    },

    computed: {
    //      
    },
    methods: {
      ...mapMutations(['getReservations']),
      infoRoom: item => item.id +' ' + ' '+ '→' +' '+ ' '+item.type,
      agregarFecha(){
        var fechai = this.date[0]
        var fechaf = this.date[1]

        for (let i = 0; i < this.habitaciones.length; i++) {
          var datosFront = {id: i, Fechai: fechai, Fechaf: fechaf, Habitacion:this.habitaciones[i]}
          this.reservasFront.push(datosFront)
          this.i+=1
        }        
        this.date = []
        this.habitaciones = []

      },
      deleteReservation(item){
        const index = this.getIndex(item.id)
        if (index >= 0) this.reservasFront.splice(index, 1)

      },
      getIndex(id) {
        var index = -1;
        this.reservasFront.filter(function (reservation, i) {
            if (reservation.id === id) {
                index = i;
            }
        });
        return index;
       },
      remove (item) {
        const index = this.habitaciones.indexOf(item.id)
        if (index >= 0) this.habitaciones.splice(index, 1)
      },
      validate() {
        if (this.$refs.form.validate() && this.reservasFront.length > 0) {
          this.fullField = false
        }
        else
          this.fullField = true

      },
      async createReservation() {
        
        for (let i = 0; i < this.reservasFront.length; i++) {
          var datei = this.formatDate(this.reservasFront[i].Fechai)
          var datef = this.formatDate(this.reservasFront[i].Fechaf)

          var idRoom = this.reservasFront[i].Habitacion
          this.reservasBack = this.reservasBack+ idRoom +'_'+datei +'_' + datef+','
        } 
        console.log(this.reservasBack)
        this.reservanding = true
        await axios.post('http://157.245.12.218:8181/MingesoBackend/reservationHolders', 
        {
          name: this.name,
          rut: this.rut,
          email: this.email,
        }
        ).then(response => {
        (this.id = response.data.id)
        }).catch(e => { console.log(e); this.showError = true});
        
        if(this.id != 0)
        {
          await axios.post('http://157.245.12.218:8181/MingesoBackend/reservations/create/?reservationHolderId='+this.id+'&rooms='+this.reservasBack.substring(0,this.reservasBack.length-1), 
          {
            price: 0,
          }).then(response => {}).catch(e => {console.log(e); this.showError = true})
        }
        this.getReservations()
        this.reservanding = false
        this.closeDialog()
        this.show = true

      },
      async getAvailableRooms(date1,date2){
        var datei = this.formatDate(date1)
        var datef = this.formatDate(date2)
        this.loading = true
        await axios.get('http://157.245.12.218:8181/MingesoBackend/reservationrooms/availables', 
        { params:{
            arrivalDate: datei,
            departureDate: datef,
          }
        }
        ).then(response => {(this.availableRooms = response.data)
        //
        }).catch(e => {
          console.log(e);
        });
        this.availableRooms.sort(function (a, b) {
          return (a.id - b.id)
        })
        this.loading = false
      },

      formatDate(date){
        var value = new Date(date)
        return value.getMonth()+1 + "/" + (value.getDate()+1) + "/" + "20"+ (value.getYear()-100)
      },
      closeDialog(){
        this.$refs.form.reset()
        this.i = 0
        this.reservasFront = []
        this.reservasBack = ""
        this.habitaciones = []
        this.date = []
        this.habitaciones = []
        this.date = []
        this.type = ""
        this.valid = true
        this.fullField = true
        this.dialog = false
      },
      haveNumber(name){
        if (typeof(name) != "undefined") {
          var numeros="0123456789?¿@#!¡&${}[]()%?*/.,"
          var texto = name.toString()
          for(var i=0; i<texto.length; i++){
              if (numeros.indexOf(texto.charAt(i),0)!=-1){
                return false;
              }
          }
          return true;
        }
      },
      ValidaRut(cRut) {
        if (typeof(cRut) != "undefined") {
        cRut = cRut.replace(/[\.-]/g, "");
        cRut = cRut.toUpperCase();
        var patt = /^\d{1,8}[0-9K]$/;
        var ok = patt.test(cRut);
        var cStr = cRut.slice(0, -1);
        var cDig = cRut.slice(-1);
        var nSum = 0;
        var nVal = 0;
        var cVal = "";
        var nMul = 0;

        if (ok) {
            for (nMul = 2; cStr != ""; nMul = (nMul == 7) ? 2 : nMul + 1) {
                nSum += Number(cStr.slice(-1)) * nMul;
                cStr = cStr.slice(0, -1);
            }
            nVal = 11 - (nSum % 11);
            switch (nVal) {
                case 11:
                    cVal = "0";
                    break;
                case 10:
                    cVal = "K";
                    break;
                default:
                    cVal = nVal.toString();
            }
            ok = cVal == cDig;
        }
        return ok;
      }
    }

    },
    watch: {
      rut: function(){
        if (typeof(this.rut) != "undefined") {
        if(this.rut.length == 12)
          this.mask = '##.###.###-#'
        else
          this.mask = '#.###.###-#'
        }

      },
      date: function(){
        if(this.date.length == 2){
          this.roomStatus = true
          this.getAvailableRooms(this.date[0],this.date[1])
        }
        else
            this.roomStatus = false
  
      },
      habitaciones: function(){
        if(this.habitaciones.length >0)
          this.addStatus = false
        else
            this.addStatus = true
      },
      reservasFront: function(){
        if (typeof(this.reservasFront) != "undefined") {
        this.validate() 
        }
      },
      valid: function(){
        if(this.valid)
          this.validate()
      }
    },
  }
</script>