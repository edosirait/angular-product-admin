import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/auth/login';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUser(): any {
    return this.currentUserSubject.getValue() || JSON.parse(localStorage.getItem('user') || '{}');
  }

  login(username: string, password: string, expiresInMins: number = 30): Observable<any> {
    const body = { username, password, expiresInMins };
    return this.http.post<any>(this.loginUrl, body, { withCredentials: true }).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUserSubject.next(response);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

}
