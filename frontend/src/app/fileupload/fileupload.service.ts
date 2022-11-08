import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  baseURL:string="http://localhost:3000/readstudentdetails"

  constructor(private http:HttpClient) { }

  readFile(){
    console.log("Read starts")
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
      const response= this.http.get(this.baseURL)
      response.subscribe()
  }
}
