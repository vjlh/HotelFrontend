<template>
  <v-bottom-navigation
    v-model="bottomNav"
    light
  >
    <v-btn>
      <span>Nueva Reserva</span>
      <v-icon>mdi-calendar-plus</v-icon>
    </v-btn>

    <v-btn>
      <span>Nueva habitación</span>
      <v-icon>mdi-hotel</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>
<script>
  export default {
    data () {
      return {
        bottomNav: 3,
      }
    },

    computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
        }
      },
    },
  }
</script>