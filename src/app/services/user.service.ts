import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url: string = '/assets/user.json';

  constructor(private _http: HttpClient) { }

  public getUser(): Observable<IUser> {
    return this._http.get<IUser>(this.url);
  }
}
