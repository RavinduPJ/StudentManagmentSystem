import { Injectable } from '@angular/core';
import { FirstTabModel } from '../components/first-tab/models/first-tab-models';

@Injectable({
   providedIn: 'root'
})
export class FirstTabService {

   constructor() { }

   public firstTabModel: FirstTabModel;
}
