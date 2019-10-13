<template>
    <ejs-schedule 
        id='Schedule' 
        ref='ScheduleObj' 
        width='100%' 
        height='600px'
        :eventSettings='eventSettings' 
        :selectedDate='selectedDate' 
        :group='group'
        :renderCell='onRenderCell'
        :resourceHeaderTemplate='resourceHeaderTemplate'
        :headerRows='headerRows'
        allowResizing=true
        >
        <e-views>
            <e-view 
            option='TimelineMonth' 
            interval=3
            :eventTemplate='timelineEventTemplate' 
            allowVirtualScrolling
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
            idField='id' 
            :colorField="'#FF5733'">
            </e-resource>
        </e-resources>
    </ejs-schedule>
    
</template>
<script>
    import Vue from 'vue';
    import { SchedulePlugin, TimelineViews, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-vue-schedule';
    import { L10n } from '@syncfusion/ej2-base';
    import {mapState, mapMutations} from 'vuex';
    Vue.use(SchedulePlugin);

    //loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

    L10n.load({
        'es-CL': {
            'schedule': {
                'addTitle' : 'Nombre Reservante',
                'saveButton': 'Guardar',
                'cancelButton': 'Cerrar',
                'deleteButton': 'Eliminar',
                'newEvent': 'Nueva Reserva',
            },
        }
    });
    var timelineEventTemplateVue = Vue.component('timelineTemplate', {
        template: `<div class='template-wrap' style='{background: data.color}'>{{data.Subject}}</div>`,
        data() {
            return {
                data: {}
            };
        }
    });
     
    var resourceHeaderTemplateVue = Vue.component('headerTemplate', {
        template: 
               `<div class='template-wrap'>
                    <div class="room-name">{{data.resourceData.id}}</div>
                    <div class="room-type">{{data.resourceData.type}}</div>
                    <div class="room-capacity">{{data.resourceData.capacity}}</div>
                </div>`,
        data() {
            return {
                data: {}
            };
        }
    });
    
    export default {
        data() {
            return {
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
            ...mapMutations(['AgregarReserva','fixReservations']),
            onRenderCell: function(args){
                if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
                    let target = args.element.querySelector('.e-resource-text');
                    target.innerHTML = '<div class="name">Habitación</div><div class="type">Tipo</div><div class="capacity">Capacidad</div>';
                    }
            },
            datasource(){
                var reservations = this.reservations
                this.eventSettings.dataSource = reservations
            },
            //scheduleObj.refreshEvents();
        },

        computed:{
            ...mapState(['ownerDataSource','dataSource','reservations']),
        },
        provide: {
            schedule: [TimelineViews, TimelineMonth, DragAndDrop]
        },
        beforeMount() {
            this.datasource()
        },
    }
</script>

<style>
  @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css";
  .e-schedule .e-timeline-month-view .e-resource-left-td {
        vertical-align: bottom;
        width: 300px;
        
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
        /*background: #c7add8;*/
    }

    .e-schedule .e-timeline-month-view .e-resource-left-td .e-resource-text>div:last-child {
        border-right: 0;
        
    }

    .e-schedule .template-wrap {
        display: flex;
        height: 100%;
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

    .e-schedule .template-wrap>div:last-child {
        border-right: 0;

    }

    .e-schedule .e-timeline-view .e-resource-cells,
    .e-schedule .e-timeline-month-view .e-resource-cells {
        padding-left: 0;
        
    }

    .e-schedule .e-timeline-month-view .e-date-header-wrap table col,
    .e-schedule .e-timeline-month-view .e-content-wrap table col {
        width: 70px;
        
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
    .e-schedule .template-wrap-2 .subject {
        text-align: left;
        padding-top: 6px;
        padding-left: 5px;
        vertical-align: middle;
        font-size: 14px;
        font-weight: bold;
        
        
    }

    .e-schedule .template-wrap-2 {
        width: 100%;
        height: 100%;
    }

</style>