<template>
  <v-container>
    <EditDialog/>
    <ejs-schedule 
        id='Schedule' 
        ref='ScheduleObj' 
        width='100%' 
        height= '620px'
        :eventSettings='eventSettings' 
        :selectedDate='selectedDate' 
        :group='group'
        :renderCell='onRenderCell'
        :resourceHeaderTemplate='resourceHeaderTemplate'
        :headerRows='headerRows'
        :popupOpen='onPopupOpen'
        >
        <e-views>
            <e-view 
            option='TimelineMonth' 
            :eventTemplate='timelineEventTemplate' 
            allowVirtualScrolling
            readonly=true
            ></e-view>
        </e-views>
        <e-resources>
            <e-resource 
            allowMultiple=true
            field='RoomId' 
            title='Número de habitación' 
            name='MeetingRoom' 
            :dataSource='ownerDataSource' 
            textField='id' 
            idField='id'>
            </e-resource>
        </e-resources>
    </ejs-schedule>
   </v-container> 
</template>
<script>
import {TimelineViews, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-vue-schedule';
import {mapState, mapMutations} from 'vuex';
import timelineEventTemplateVue from './RackTemplates/TimelineTemplate'
import resourceHeaderTemplateVue from './RackTemplates/ResourceHeaderTemplate'
import EditDialog from './RackTemplates/editDialog'


//loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

export default {
  name: 'App',
  components:{
    timelineEventTemplateVue,
    resourceHeaderTemplateVue,
    EditDialog,
  },
  data() {
      return {
          len: 0,
          editRoomDialog: false,
          headerRows: [{ option: 'Month' }, { option: 'Date' }],
          selectedDate: new Date(Date.now()),
          group: {
              byGroupID: false,
              resources: ['MeetingRoom']
          },
          locale: 'es',
          resourceHeaderTemplate: function(e){
                return {
                  template: resourceHeaderTemplateVue
              };
          },
          timelineEventTemplate: function (e) {
              return {
                  template: timelineEventTemplateVue
              };
          },
          eventSettings: {
              dataSource: [],
              enableTooltip: true,
              fields: {
              id: 'Id',
              subject: { name: 'Subject', title: 'Nombre',validation: { required: true }},
              location: { name: 'Location', title: 'Ubicación',validation: { required: true }},
              description: { name: 'Description', title: 'Descripción del evento'},
              startTime: { name: 'StartTime', title: 'Inicio de la reserva',validation: { required: true } },
              endTime: { name: 'EndTime', title: 'Fin de la reserva',validation: { required: true } }
              }
          },
          allowMultiple: true,
      }
  },
  methods: {
      onRenderCell: function(args){
          if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
              let target = args.element.querySelector('.e-resource-text');
              target.innerHTML = '<div class="name">Acción</div><div class="type">Habitación</div><div class="capacity">Tipo</div>';
              }
      },
      datasource(){
          this.eventSettings.dataSource = []
          var reservations = this.reservations
          this.eventSettings.dataSource = reservations
          this.len = this.eventSettings.dataSource.length
      },
      onPopupOpen: function(args) {
          args.cancel = true;
      }
      //scheduleObj.refreshEvents();
  },

  computed:{
    ...mapState(['ownerDataSource','reservations']),
  },
  provide: {
      schedule: [TimelineViews, TimelineMonth, DragAndDrop]
  },
  beforeMount() {
      this.datasource()
  },
  watch:{
    reservations: function(){
      if (this.reservations.length > this.len)
      {
          let scheduleObj = document.getElementById("Schedule").ej2_instances[0]; 
          scheduleObj.eventSettings.dataSource = this.reservations
          this.len = this.reservations.length
      }
    }
  },
}
</script>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css";
.e-schedule .e-timeline-month-view .e-resource-left-td {
    vertical-align: bottom;
    width: 250px;
    
}

.e-schedule .e-timeline-month-view .e-resource-left-td .e-resource-text {
    display: flex;
    font-weight: 500;
    padding: 0;
    
}

.e-schedule .e-timeline-month-view .e-resource-left-td .e-resource-text>div {
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    flex: 0 0 33.3%;
    font-weight: 500;
    height: 36px;
    line-height: 40px;
    padding-left: 5px;
}

.e-schedule .e-timeline-month-view .e-resource-left-td .e-resource-text>div:last-child {
    border-right: 0;
    
}

.e-schedule .template-wrap {
    display: flex;
    height: 100%¡;
    text-align: left;
    
}
.e-schedule .template-wrap>div {
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    flex: 0 0 33.3%;
    font-weight: 500;
    line-height: 58px;
    padding-left: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    
}

.e-schedule .e-timeline-view .e-resource-cells,
.e-schedule .e-timeline-month-view .e-resource-cells {
    padding-left: 0;
    
}

.e-schedule .e-timeline-month-view .e-date-header-wrap table col,
.e-schedule .e-timeline-month-view .e-content-wrap table col {
    width: 40px;
    
}

@media (max-width: 550px) {
    .e-schedule .e-timeline-month-view .e-resource-left-td {
        width: 50px;
        
    }
    .e-schedule .e-timeline-month-view .e-resource-left-td .e-resource-text>div,
    .e-schedule .template-wrap>div {
        flex: 0 0 100%;
        
    }
    .e-schedule .template-wrap>div:first-child {
        border-right: 0;
        
    }
    .e-schedule .e-timeline-month-view .e-resource-left-td .e-resource-text>div:first-child {
        border-right: 0;
        
    }
    .e-schedule .room-type,
    .e-schedule .room-capacity {
        display: none;

    }
}
.e-schedule .template-wrap-2{
    padding-left:20px;
    padding-top: 6px;
    vertical-align: middle;
    font-size: 14px;
    font-weight: bold;        
    
}

</style>