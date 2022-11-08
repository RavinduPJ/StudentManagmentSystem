import { Component, Injectable } from "@angular/core";
import { FileRestrictions, FileInfo } from "@progress/kendo-angular-upload";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpProgressEvent,
  HttpEventType,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of, concat } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent {
  
  uploadSaveUrl = "saveUrl"; // should represent an actual API endpoint
  uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint

  myRestrictions: FileRestrictions = {
        allowedExtensions: [".xlsx"],
      };

}

/*

  Mocked backend service.
  For further details, check
  https://angular.io/guide/http#writing-an-interceptor
  */
 
 @Injectable()
 export class UploadInterceptor implements HttpInterceptor {
  
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url === "saveUrl") {
      const events: Observable<HttpEvent<unknown>>[] = [0, 30, 60, 100].map(
        (x) =>
          of(<HttpProgressEvent>{
            type: HttpEventType.UploadProgress,
            loaded: x,
            total: 100,
          }).pipe(delay(1000))
      );

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
      events.push(success);

      return concat(...events);
    }

    if (req.url === "removeUrl") {
      return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }


}
// import { Component, OnInit } from '@angular/core';
// import { FileuploadService } from './fileupload.service';
// import { Store, select } from '@ngrx/store';
// import {
//   LoaderType,
//   LoaderThemeColor,
//   LoaderSize,
// } from "@progress/kendo-angular-indicators";
// import { updateStatus } from '../State/student.actions';
// import { FileRestrictions, FileInfo } from "@progress/kendo-angular-upload";

// @Component({
//   selector: 'app-fileupload',
//   templateUrl: './fileupload.component.html',
//   styleUrls: ['./fileupload.component.css']
// })
// export class FileuploadComponent implements OnInit {

//   uploadSaveUrl = "saveUrl"; // should represent an actual API endpoint
//   uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint

//   myRestrictions: FileRestrictions = {
//     allowedExtensions: [".xlsx"],
//   };

//   // public buttonenable = true
//   // public message = ""
//   // public updatestatus$ = 0;

//   // constructor(private fileuploadService: FileuploadService, private store: Store<{ student: number }>) {
//   //   store.pipe(select('student')).subscribe((value) => {
//   //     console.log("value", value["updatestatus"])
//   //     this.updatestatus$ = value["updatestatus"]
//   //   })
//   // }


//   // public loader =   {
//   //     type: <LoaderType>"infinite-spinner",
//   //     themeColor: <LoaderThemeColor>"tertiary",
//   //     size: <LoaderSize>"medium",
//   //   }




//   ngOnInit(): void {

//   }

//   // async onClick(): Promise<any> {
//   //   console.log("file upload called")
//   //   this.store.dispatch(updateStatus({value:2}))
//   //   this.fileuploadService.readFile()
//   //   this.buttonenable = false
//   //   this.message = "File is processing.You can shift to other pages while process is running"
//   // }


// }
