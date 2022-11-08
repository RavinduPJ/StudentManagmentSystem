import { Component, OnInit } from '@angular/core';
import { CoreBase, MIRecord, IMIResponse, IMIRequest } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { FirstTabService } from 'src/app/services/first-tab.service';
import { FirstTabModel } from 'src/app/components/first-tab/models/first-tab-models';

@Component({
   selector: 'app-first-tab',
   templateUrl: './first-tab.component.html',
   styleUrls: ['./first-tab.component.css']
})
export class FirstTabComponent extends CoreBase implements OnInit {

   isBusyMyComponent: boolean = false;
   constructor(private miService: MIService, public firstTabService: FirstTabService) {
      super('FirstTabComponent');
      firstTabService.firstTabModel = new FirstTabModel();
   }

   ngOnInit() {
   }

   onClickBtnExecute() {
      console.log("button clicked");
      this.logInfo('onClickBtnExecute');
      this.setBusy(true);
      const request: IMIRequest = {
         program: "CRS610MI",
         transaction: "LstByNumber",
         outputFields: ["CUNO", "CUNM", "CUA1", "CUA2"],
         maxReturnedRecords: 10,
      };

      // represent input records
      const inputRecord: MIRecord = new MIRecord();
      inputRecord.setString("CUNO", "1000");
      request.record = inputRecord;

      this.miService.execute(request).subscribe((response: IMIResponse) => {
         this.setBusy(false);
         if (!response.hasError()) {
            console.log("API result", response.items);
            this.firstTabService.firstTabModel.responseItems = response.items;

         }
      }, (error) => {
         this.setBusy(false);
         // Handle error
         this.logError('Unable to execute API ' + error);
      });

   }

   private setBusy(isBusy: boolean) {
      this.isBusyMyComponent = isBusy;
   }

}
