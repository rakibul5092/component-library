import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressFormService {
  private countryObservable = new BehaviorSubject<[]>([]);
  private stateObservable = new BehaviorSubject<[]>([]);
  private authTokenObservable = new BehaviorSubject<boolean>(false);
  private authToken: string;

  get countries() {
    return this.countryObservable.asObservable();
  }

  get states() {
    return this.stateObservable.asObservable();
  }

  get authTokenDefined() {
    return this.authTokenObservable.asObservable();
  }
  constructor(private http: HttpClient, @Inject('environment') private environment: any) {
    this.fetchAPIToken().subscribe((authToken) => {
      this.fetchCountries().subscribe();
    });
  }

  private fetchAPIToken() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('user-email', 'bedi.anant8@gmail.com');
    headers = headers.set('api-token', this.environment.apiToken);
    return this.http.get<any>(this.environment.universalTutorialApiUrl + 'getaccesstoken/', { headers: headers }).pipe(
      tap((response) => {
        this.authToken = response.auth_token;
        this.authTokenObservable.next(true);
        return this.authToken;
      }),
    );
  }

  private fetchCountries() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.authToken);
    return this.http.get<any>(this.environment.universalTutorialApiUrl + 'countries/', { headers: headers }).pipe(
      tap((countries) => {
        this.countryObservable.next(countries);
        return countries;
      }),
    );
  }

  fetchStates(countryName: string) {
    if (this.authToken === undefined) return of([]);
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.authToken);
    return this.http.get<any>(this.environment.universalTutorialApiUrl + 'states/' + countryName, { headers: headers }).pipe(
      tap((states) => {
        this.stateObservable.next(states);
        return states;
      }),
    );
  }
}
