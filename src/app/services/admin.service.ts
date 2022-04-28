import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url ="http://localhost:8080"
  constructor(private http : HttpClient) { }


  addQuestion(questions : any) : Observable<any>{
    return this.http.post<any>(this.url + "/api/questions/addQuestion", questions )

  }
}
