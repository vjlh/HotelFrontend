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
        :headerRows='headerRows'
        allowResizing=true
        >
        <e-views>
            <e-view 
            option='TimelineMonth' 
            interval=3
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
            textField='text' 
            idField='id' 
            colorField='color'>
            </e-resource>
        </e-resources>
    </ejs-schedule>
</template>
<script>
    import Vue from 'vue';
    import { SchedulePlugin, TimelineViews, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-vue-schedule';
    import { L10n } from '@syncfusion/ej2-base';
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
     
    /*var timelineEventTemplateVue = Vue.component('timelineTemplate', {
        template: `
            <div class='template-wrap-2' style="{background: '#51d1f6'}">
                <div class="subject" style="{background: '#000000'};">{{data.Subject}}</div>
            </div>`,
        data() {
            return {
                data: {}
            };
        }
    });

    var resourceHeaderTemplateVue = Vue.component('headerTemplate', {
        template: 
               `<div class='template-wrap'>
                    <div class="room-name">{{data.resourceData.text}}</div>
                    <div class="room-type">{{data.resourceData.type}}</div>
                    <div class="room-capacity">{{data.resourceData.capacity}}</div>
                </div>`,
        data() {
            return {
                data: {}
            };
        }
    })*/;
    
    export default {
        data() {
            return {
                  /*timelineEventTemplate: function (e) {
                    return {
                        template: timelineEventTemplateVue
                    };
                },*/
                headerRows: [{ option: 'Month' }, { option: 'Date' }],
                selectedDate: new Date(Date.now()),
                group: {
                    byGroupID: false,
                    resources: ['MeetingRoom']
                },
                locale: 'es',
                ownerDataSource: [
                    { text: '1', id: 1, color: '#51d1f6', capacity: 20, type: 'Conference' },
                    { text: '2', id: 2, color: '#51d1f6', capacity: 7, type: 'Cabin' },
                    { text: '3',id: 3, color: '#51d1f6', capacity: 5, type: 'Cabin' },
                    { text: '4', id: 4, color: '#51d1f6', capacity: 15, type: 'Conference' },
                    { text: '5', id: 5, color: '#51d1f6', capacity: 25, type: 'Conference' },
                    { text: '6', id: 6, color: '#51d1f6', capacity: 10, type: 'Cabin' },
                    { text: '7', id: 7, color: '#51d1f6', capacity: 20, type: 'Conference' },
                    { text: '8', id: 8, color: '#51d1f6', capacity: 8, type: 'Cabin' },
                    { text: '9', id: 9, color: '#51d1f6', capacity: 30, type: 'Conference' },
                    { text: '10', id: 10, color: '#51d1f6', capacity: 25, type: 'Conference' },
                    { text: '11', id: 11, color: '#51d1f6', capacity: 25, type: 'Conference' },
                    { text: '12', id: 12, color: '#51d1f6', capacity: 10, type: 'Cabin' },
                    { text: '13', id: 13, color: '#51d1f6', capacity: 20, type: 'Conference' },
                    { text: '14', id: 14, color: '#51d1f6', capacity: 8, type: 'Cabin' },
                    { text: '15', id: 15, color: '#51d1f6', capacity: 30, type: 'Conference' },
                    { text: '16', id: 16, color: '#51d1f6', capacity: 25, type: 'Conference' }   
                ],
                /*resourceHeaderTemplate: function(e){
                     return {
                        template: resourceHeaderTemplateVue
                    };
                },*/
                eventSettings: {
                    dataSource: [{EventName: "Reserva 2", StartTime:new Date(2019, 9, 18), EndTime:new Date(2019, 9, 29), RoomId:1, id:1, IsAllDay:true, Subject:"Reserva 1"},
                                 {EventName: "Reserva 1", StartTime:new Date(Date.now()),  EndTime:new Date(2019, 9, 10), RoomId:1, id:2, IsAllDay:true, Subject:"Reserva 2"},
                                 {EventName: "Reserva 3", StartTime:new Date(2019, 9, 18),  EndTime:new Date(2019, 9, 23), RoomId:2, id:3, IsAllDay:true, Subject:"Reserva 3"},
                                 {EventName: "Reserva 3", StartTime:new Date(2019, 9, 8),  EndTime:new Date(2019, 9, 28), RoomId:4, id:4, IsAllDay:true, Subject:"Reserva 4"},],
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
                    target.innerHTML = '<div class="name">Habitación</div><div class="type">Tipo</div><div class="capacity">Capacidad</div>';
                }
            },
            //scheduleObj.refreshEvents();
        },
        provide: {
            schedule: [TimelineViews, TimelineMonth, Resize, DragAndDrop]
        }
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