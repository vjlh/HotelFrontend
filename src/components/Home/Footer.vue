<template>
    <v-footer
      :padless="padless"
      fixed
      dense
    >
    <v-row style="margin-left:35%" class="text-center">
    <v-btn text ><v-icon left color=#40C4FF size="30px">mdi-square</v-icon> Habitación reservada</v-btn>
    <v-btn text ><v-icon left color=#D81B60 size="30px">mdi-square</v-icon> Habitación ocupada</v-btn>
    </v-row>
    </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: [
        'mdi-rectangle',
        'mdi-rectangle',
      ],
    
      padless: true,
    }),
    computed: {

    },
  }
</script>