import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ThemoviedbService } from 'src/app/services/themoviedb.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  registerForm!: FormGroup;
  busqueda:Array<any> = [];
  movies:any
  searchnewMovies: any;
  constructor(private search:ThemoviedbService,
    private peliculasservice:PeliculasService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.getMovie("avatar")
  }

  getMovie(name:any){
    console.log(name);
    let d;
    if(name.value){
      d=name.value;
    } else{
      d=name;
    }
      this.search.getMovie(d).subscribe({
      next:(s:any)=>{
        this.busqueda = s.results;
        console.log(this.search);
        console.log(s.results);
      },
      error: (e)=>{
      }
    })
  }

  Guardado(id:any){
    this.movies=this.busqueda.find((e:any)=>e.id==id)
    console.log(this.movies);
    this.peliculasservice.guardarMovies(this.movies).subscribe({
      next:(res)=>{
        console.log(res);
      }
    })

  }


  searchnewMovie(event:any){
    const text = event.target.value;
    if(text && text.trim() != ''){
      this.searchnewMovies = this.searchnewMovies.filter((movies: any) =>{
        return (movies.original_title.toLowerCase().indexOf(text.toLowerCase()) > -1); 
  
  })
      }
  
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Agrgada a favoritos',
      duration: 1500,
      icon: 'heart'
    });

    await toast.present();
  }

  }


