import { Component } from '@angular/core';
import {WeatherApiService} from "./services/weather-api.service";
import {forkJoin, Observable, subscribeOn} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  cities = [{name: 'Москва', lat: undefined, lon: undefined},
    {name: 'Санкт-Петербург', lat: undefined, lon: undefined},
    {name: 'Екатеринбург', lat: undefined, lon: undefined},
    {name: 'Владивосток', lat: undefined, lon: undefined}]

  selectedCity:any;
  loadDataInProcess = false

  constructor(private weatherService: WeatherApiService) {

    let observables: Observable<any>[] = [];

    this.cities.forEach(city => {
      observables.push(this.weatherService.getCityCoordinates(city.name))
    })

    this.loadDataInProcess = true;

    forkJoin(observables).subscribe(result => {
      this.cities.forEach((value, index) => {
        value.lat = result[index][0].lat;
        value.lon = result[index][0].lon;
      })
    }, error => {
      console.log(error)
    }, () => {
      this.loadDataInProcess = false;
      console.log(this.cities)
    })
  }

  fetchInfoAboutCity(){
    if(this.selectedCity && this.selectedCity['lat'] && this.selectedCity['lon']) {
      this.loadDataInProcess = true;
      this.weatherService.getCityWeatherData(this.selectedCity['lat'], this.selectedCity['lon'])
        .subscribe(result => {
          if(this.selectedCity) {
            this.selectedCity.wind =result.wind;
            this.selectedCity.main = result.main;
          }
        }, error => {
          console.log(error)
        }, () => {
          this.loadDataInProcess = false;
        })
    }
  }

}
