import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  urlApiLocal:string ="http://127.0.0.1:8000/api/"
  constructor(private http:HttpClient) { }
  showpeliculas(){
    return this.http.get<any>(this.urlApiLocal+'movies')
  }

  guardarMovies(form:any){
    const params =new FormData();
    params.set('poster_path',form.poster_path);
    params.set('overview',form.overview,);
    params.set('release_date',form.release_date);
    params.set('original_title',form.original_title);
    params.set('original_language',form.original_language);
    params.set('genre_ids',form.genre_ids);
    console.log(params);
    return this.http.post<any>(this.urlApiLocal+'movies',params)

  }
  
  deleteMovies(id:any){
    return this.http.delete<any>(this.urlApiLocal+'movies/'+id)
}



}
