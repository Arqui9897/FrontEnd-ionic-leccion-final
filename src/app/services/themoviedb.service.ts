import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {
  apiURLI: string="https://api.themoviedb.org/3/search/movie?api_key=5b8d745622754f72e9646c04e5df2db4&query=";
  apilista: string="https://api.themoviedb.org/3/genre/movie/list?api_key=5b8d745622754f72e9646c04e5df2db4&language=en-US"
  constructor(private http:HttpClient) { }
  getMovie(nombre:string){
    console.log(nombre);
    return this.http.get<any>(this.apiURLI+nombre+"&language=en-US&page=1&include_adult=false");
  }
  getlista(){
    return this.http.get<any>(this.apilista);
  }
  
  
}
