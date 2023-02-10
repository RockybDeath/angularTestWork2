import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  private directGeocodingApiUrl = "http://api.openweathermap.org/geo/1.0/direct";

  private weatherDataApiUrl = "https://api.openweathermap.org/data/2.5/weather"
  private apiKey = "f26bb44705847c4e95d938cfc75ee29b"

  getCityCoordinates(cityName: string): Observable<any>{
    return this.http.get(this.directGeocodingApiUrl + "?q=" + cityName + "&appid=" + this.apiKey)
      .pipe(take(1));
  }

  getCityWeatherData(lat: number, lon: number): Observable<any>{
    return this.http.get(this.weatherDataApiUrl + "?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + this.apiKey)
      .pipe(take(1));
  }
}
