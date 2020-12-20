import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credential, User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = "http://..."
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credential: Credential): Observable<User> {
    return this.http.post(this.url + '/login', credential)
    .pipe(
      map(res=>{
        // login is successful
        const user = res as User
        if ( user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user.token))
          localStorage.setItem('username', user.credential.username);
          this.currentUserSubject.next(user);
        }
        return user
      }
    ))
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
