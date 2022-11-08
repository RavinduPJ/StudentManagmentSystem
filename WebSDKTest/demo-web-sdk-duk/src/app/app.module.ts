import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from '@infor-up/m3-odin';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import { SohoComponentsModule } from 'ids-enterprise-ng'; // TODO Consider only importing individual SoHo modules in production
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { FirstTabComponent } from './components/first-tab/first-tab.component';
import {FirstTabService} from "./services/first-tab.service";
import { SecondTabComponent } from './components/second-tab/second-tab.component';
import { ThirdTabComponent } from './components/third-tab/third-tab.component'
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';




@NgModule({
   declarations: [
      AppComponent,
      FirstTabComponent,
      SecondTabComponent,
      ThirdTabComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      SohoComponentsModule,
      M3OdinModule,
      AppRoutingModule,
      GridModule,
      BrowserAnimationsModule,
      DropDownsModule
   ],
   providers: [
      {
         provide: LOCALE_ID,
         useValue: 'en-US',
      },
      {
         provide: APP_INITIALIZER,
         multi: true,
         useFactory: (locale: string) => () => {
            Soho.Locale.culturesPath = 'assets/ids-enterprise/js/cultures/';
            return Soho.Locale.set(locale).catch(err => {
               Log.error('Failed to set IDS locale', err);
            });
         },
         deps: [LOCALE_ID],
      },
      FirstTabService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
