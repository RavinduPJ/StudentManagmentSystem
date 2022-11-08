import { Component, OnInit } from '@angular/core';
import { FirstTabService } from 'src/app/services/first-tab.service';

@Component({
   selector: 'app-third-tab',
   templateUrl: './third-tab.component.html',
   styleUrls: ['./third-tab.component.css']
})
export class ThirdTabComponent implements OnInit {

   public dropDownList: any[] = [];
   public dropDownListMain: any[] = [];
   public selectedValue: any;
   constructor(public firstTabService: FirstTabService) { }

   ngOnInit() {
      this.dropDownList = this.firstTabService.firstTabModel.responseItems;
      this.dropDownListMain = this.firstTabService.firstTabModel.responseItems;
   }

   handleStyleFilter(value): void {
      this.dropDownList = this.dropDownListMain.filter((s) => s.CUNM.toLowerCase().indexOf(value.toLowerCase()) !== -1);
   }

}
