<template>
  <v-bottom-navigation
    v-model="bottomNav"
    light
    shift
  >
  <VBtn color="success">text</VBtn>
    <v-btn
    to="/">
      <span>Rack</span>
      <v-icon>mdi-calendar-month</v-icon>
    </v-btn>

    <v-btn
    to="/about">
      <span>Music</span>
      <v-icon>mdi-music-note</v-icon>
    </v-btn>

    <v-btn
    to="/about">
      <span>Book</span>
      <v-icon>mdi-book</v-icon>
    </v-btn>

    <v-btn
    to="/about">
      <span>Image</span>
      <v-icon>mdi-image</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
  export default {
    data () {
      return {
        bottomNav: 0,
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