<template>
  <v-row class="template-wrap-2" v-bind:style="{background: $data.data.Color}">
    {{$data.data.Subject}}
    </v-row>
</template>

<script>
export default {
  name: 'timelineTemplate'

}
</script>

<style>

</style>