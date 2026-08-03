import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import {  TableColumn } from '../../models/table-column';
import { validationMessages } from '../../constants/validation.message';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-data-table',
  imports: [
     TableModule,
        ButtonModule,
        TooltipModule
  ],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
  standalone:true
})
export class DataTable {
 readonly statusEnumLabel = validationMessages;
  lazyLoad = output<TableLazyLoadEvent>();
   columns = input.required<TableColumn[]>();
    data = input<any[]>([]);
    loading = input(false);
    totalRecords = input(0);
    statusAction = output<any>();
    edit = output<any>();
    delete = output<any>();
    details = output<any>();
    actions = input({
    view: true,
    edit: true,
    delete: true
});

statusValue=input<(val: any) => any>((val) => val);
  statusIcon=input<(val: any) => any>((val) => val);
  statusSeverity=input<(val: any) => any>((val) => val);
}
