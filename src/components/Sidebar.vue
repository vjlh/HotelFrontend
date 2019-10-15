<template>
 <div>
      <v-toolbar
        elevation=10
        height=50
        dark
        tile>
        <v-toolbar-title><v-btn x-large depressed to="/"><VIcon left>mdi-hospital-building</VIcon> HotelG5</v-btn></v-toolbar-title>
  
        <div class="flex-grow-1"></div>
  
        <v-toolbar-items>
          <v-btn text to="/"><v-icon left>mdi-calendar-month</v-icon>Rack</v-btn>
          <v-btn disabled text to="/about"><v-icon left>mdi-hotel</v-icon>Habitaciones</v-btn>
        </v-toolbar-items>

      </v-toolbar>
      <v-content>
      <router-view/>
    </v-content>
  </div>
</template>