import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentgridService extends BehaviorSubject<GridDataResult>{
  public loading: boolean;
  constructor(private http: HttpClient) { 
    super(null)
  }

  public query(state: any,searchkey:string): void {
 
    this.fetch(state,searchkey).subscribe((x) => super.next(x));
  }

  protected fetch( state: any,searchkey:string): Observable<GridDataResult> {
    const url='http://localhost:3000/graphql'
    console.log("fetchall",state,searchkey)
    this.loading = true;
    console.log("state",state,searchkey)
    const query= `{
        allstudents(options:{take:${state.take},skip:${state.skip},searchkey:"${searchkey}"}){
          total
          data{
            id            
            first_name
            last_name
            date_of_birth
            email
            age
          }
        }
    }`
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(url, JSON.stringify({ query: query }), httpOptions).pipe(
      map(
        (response:any) =>{
          console.log("Response",response)
          return <GridDataResult>response.data.allstudents
        }
         
      ),
      tap(() => (this.loading = false))
    );
  }
}

@Injectable()
export class StudentDetailsService extends StudentgridService {
  constructor(http: HttpClient) {
    super(http);
  }

  queryAll(st?: any,searchkey?:string): Observable<GridDataResult> {
    const state = Object.assign({}, st);
    delete state.skip;
    delete state.take;

    return this.fetch(state,searchkey);
  }
}