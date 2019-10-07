<template>
     <div>
        <ejs-gantt ref='gantt' 
          id="GanttContainer" 
          :dataSource="data" 
          :taskFields = "taskFields" 
          :height = "height" 
          :columns="columns" 
          :splitterSettings= "splitterSettings" 
          :allowSorting= 'true' 
          :toolbar="toolbar" 
          :searchSettings="searchSettings" 
          :timelineSettings="timelineSettings" 
          :editSettings="editSettings"
          :taskbarHeight="taskbarHeight"
          :rowHeight="rowHeight"
          :taskbarTemplate="taskbarTemplate"
          :parentTaskbarTemplate="parentTaskbarTemplate"
          :queryTaskbarInfo = "queryTaskbarInfo"
          :gridLines="gridLines"></ejs-gantt>
    </div>
</template>
<script>
import Vue from "vue";
import { GanttPlugin, Toolbar, Filter,Sort, Edit} from "@syncfusion/ej2-vue-gantt";
Vue.use(GanttPlugin);
export default {
  data: function() {
    return{
      data: [
        
        {TaskID: 1,TaskName: 'Project initiation',StartDate: new Date('04/02/2019'),EndDate: new Date('04/21/2019'),Status:0},
        {TaskID: 1,TaskName: 'Project initiation',StartDate: new Date('05/02/2019'),EndDate: new Date('05/21/2019'),Status:0},
        {TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('04/02/2019'), EndDate: new Date('04/21/2019'),Status:100},
        {TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('04/06/2019'), EndDate: new Date('04/15/2019'),Progress: 50,Status:100},
        {TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/07/2019'), EndDate: new Date('04/10/2019'), Progress: 50 ,Status:0},
        {TaskID: 5,TaskName: 'Project estimation',StartDate: new Date('05/10/2019'),EndDate: new Date('05/19/2019'),Status:100}
      ],
      height: '450px',
      taskbarHeight:50,
      rowHeight: 50,
      gridLines : 'Both',
      timelineSettings: {
                timelineViewMode:'Week',
                timelineUnitSize:100,
            },
      taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Status',
        dependency: 'Predecessor',
        child: 'subtasks',
      },
      editSettings: {
        allowEditing: true,
        allowTaskbarEditing:true,
        mode: 'Auto'
      },
      toolbar: ['Search','ZoomIn','ZoomOut','ZoomToFit'],
      splitterSettings:{
      columnIndex:3
      },
      splitterSettings: {
        columnIndex: 3
      },
      columns: [
        { field: 'TaskID', headerText: 'Task ID', textAlign: 'Left', width: '100' },
        { field: 'TaskName', headerText: 'Task Name', width: '150' },
        { field: 'StartDate', headerText: 'Start Date', width: '150' },
        { field: 'Duration', headerText: 'Duration', width: '150' },
      ],
      queryTaskbarInfo: function(args) {
        if (args.data.Status == 0) {
                args.progressBarBgColor = "red";
            } else if (args.data.Status == 100) {
                args.progressBarBgColor = "green";}
        }
    };
  },
  provide: {
      gantt: [ Toolbar, Filter, Sort, Edit ]
  }
};
</script>

<style>
.e-custom-parent {
  background-color: #6d619b;
  border: 1px solid #3f51b5;
}

.e-custom-moments {
  background-color: #7ab748;
  border: 1px solid #3f51b5;
}

.e-custom-performance {
  background-color: #ad7a66;
  border: 1px solid #3f51b5;
}
#taskbarTemplate .e-milestone-top {
  border-bottom-color: #7ab748 !important;
  border-bottom: 1px solid #3f51b5;
}

#taskbarTemplate .e-milestone-bottom {
  border-top-color: #7ab748 !important;
  border-top: 1px solid #3f51b5;
}
</style>

