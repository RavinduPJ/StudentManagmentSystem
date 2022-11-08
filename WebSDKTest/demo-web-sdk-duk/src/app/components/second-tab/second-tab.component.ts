import { Component, OnInit } from '@angular/core';
import { FirstTabService } from 'src/app/services/first-tab.service';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';

@Component({
   selector: 'app-second-tab',
   templateUrl: './second-tab.component.html',
   styleUrls: ['./second-tab.component.css']
})
export class SecondTabComponent implements OnInit {

   public state: State;
   public gridData: GridDataResult;
   public gridDataOriginal: GridDataResult[] = [];

   constructor(public firstTabService: FirstTabService) {
      this.gridDataOriginal = firstTabService.firstTabModel.responseItems;
   }

   ngOnInit() {
      this.state = { skip: 0, take: 60, sort: [], filter: { filters: [], logic: 'and' } };
      this.loadGridData();
   }

   public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
      this.gridData = process(this.gridDataOriginal, this.state);
   }

   private loadGridData(): void {
      this.gridData = { data: this.gridDataOriginal.slice(this.state.skip, this.state.skip + this.state.take), total: this.gridDataOriginal.length };
   }

}