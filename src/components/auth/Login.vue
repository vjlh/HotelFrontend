<template>
      <v-container
        class="fill-height"
        fluid
      >
      <v-snackbar
      v-model="credentialValidation"
      :color="snackBarColor"
      :timeout="timeout"
      top
      >
        {{credentialValidationText}}
        <v-btn
          dark
          text
          @click="credentialValidation = false">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-snackbar>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Nombre de Usuario"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="usernameRules"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="passwordRules"

                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="primary">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password:'',
        snackBarColor:'primary',
        credentialValidation: false,
        credentialValidationText: '',
        timeout: 4000,
        usernameRules: [
        v => !!v || 'El nombre de usuario es requerido',
        ],
        passwordRules:[
        v => !!v || 'La contraseña es requerida',

        ]
      }
    },
    methods:{
      login(){
        this.$store.dispatch('retrieveUser',{
          username:this.username,
          password:this.password
        })
        .then(response => {
          this.snackBarColor = 'success'
          this.credentialValidationText = "Ha ingresado correctamente"
          this.credentialValidation = true
          this.$router.push({name: 'home'})
        })
        .catch(error =>{
          this.snackBarColor = 'error'
          this.credentialValidationText = error.response.data
          this.credentialValidation = true
        })
      },
    }
  }
</script>
