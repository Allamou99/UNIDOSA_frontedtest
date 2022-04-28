import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
interface UserLogin {
  username : string,
  password : string
}

interface User {
  username : any;
  email : any;
  password : any;
  firstname : any;
  lastname : any;
}

interface AuthResponse {
  status: string;
  success: string;
  token: string;
  inNeed: boolean;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}
interface Signupresponse{
  success:boolean;
  status:string;
  message:string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {
  url = "http://localhost:8080";
  tokenKey = 'JWT';
  isAuthenticated: boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken?: string = undefined;
  IsAuthenticatedInNeed: boolean = false;
  
  constructor(private http : HttpClient,
    /*private ProcessHttpErrorsService : ProcessHttpErrorsService*/) { 
  }



  sendUsername(name: string) {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);

    }
  }

  storeUserCredentials(credentials: any) {
    console.log('storeUserCredentials ', credentials);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }




  Login(user : UserLogin) : Observable<any> {
    return this.http.post<any>(this.url+'/api/auth/login', user)
    .pipe(map(res=>{
      this.storeUserCredentials({username: user.username, token: res.accesToken});
          return {'success': true, 'username': user.username };
    }), 
    /*catchError(error => this.ProcessHttpErrorsService.handleError(error))*/);
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(): any {
    return this.authToken;
  }}
