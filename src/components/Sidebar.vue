<template>
 <div>
      <v-toolbar
        elevation=10
        height=65
        dark
        tile>
        <v-toolbar-title>HotelG5</v-toolbar-title>
  
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