import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  public state:{take:number,skip:number}={take:25,skip:0}
  constructor(private http: HttpClient) { }

  getAllStudents(options:{take:number,skip:number}): Observable<any> {
    const url='http://localhost:3000/graphql'

    
   const query= `{
    query{
      allstudents(options:{take:${options.take},skip:${options.skip}}){
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
    }
    }`
  

  const httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

    return this.http.post<any>(url, JSON.stringify({ query: query }), httpOptions).pipe(
      tap((data: any) => 
      console.log("All Students",data.data.allstudents)),
      catchError(this.handleError<any>())
    );
  }

//-----Get Student details-------------------------------------------------------------------

getStudent(id:number): Observable<any> {
  const url='http://localhost:3000/graphql'

  
 const query= `{
  student(id:${id}){
    id
    first_name
    last_name
    age
  }
  }`


const httpOptions={
  //method: 'post',
  //body: JSON.stringify(body),
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

  return this.http.post<any>(url, JSON.stringify({ query: query }), httpOptions).pipe(
    tap((data: any) => 
    console.log("Student",data.data.student)),
    catchError(this.handleError<any>())
  );
}


//------Delete Student----------------------------------------------------------------------------------------------

deleteStudent(id:number): Observable<any> {
  const url='http://localhost:3000/graphql'

  
 const query= 
 `mutation {
    removeStudent(id:${id}){
      id	
    }
  }`


const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

  return this.http.post(url, JSON.stringify({ query: query }), httpOptions).pipe(
    tap((data: any) => 
    console.log("Student",data)),
    catchError(this.handleError<any>())
  );
}



//------Update Student----------------------------------------------------------------------------------------------

updateStudent(student:any): Observable<any> {
  const url='http://localhost:3000/graphql'

  console.log(student)
 const query= 
 `mutation{
  updateStudent(updateStudentInput:{
        id: ${student.id},
        first_name: "${student.first_name}",
        last_name: "${student.last_name}",
        date_of_birth: "${student.date_of_birth}",
        email: "${student.email}",
        age: ${student.age}
  }){
    id
    email
    first_name
    last_name
  }
}`


const httpOptions={
  //method: 'post',
  //body: JSON.stringify(body),
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

  return this.http.post(url, JSON.stringify({ query: query }), httpOptions).pipe(
    tap((data: any) => 
    console.log("Student",data)),
    catchError(this.handleError<any>())
  );
}

//------------------------------------------------------------------------------------------


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
