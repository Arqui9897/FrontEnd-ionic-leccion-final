import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ToastController } from '@ionic/angular';
import { ThemoviedbService } from 'src/app/services/themoviedb.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  peliculas: any;
  searchedMovies: any;
  generos: any;

  constructor(private peliculasservice:PeliculasService,
    private themoviedbService:ThemoviedbService,
    private toastController:ToastController) { }

  ngOnInit() {
    this.showpeliculas()
    this.showpegeneros()
 
  }

  async showpeliculas(){
    this.peliculasservice.showpeliculas().subscribe({
      next:(res)=>{
        this.peliculas=res;
        this.searchedMovies = this.peliculas;
        console.log(res);
        }
    })
}

async showpegeneros(){
  this.themoviedbService.getlista().subscribe({
    next:(res)=>{
      this.generos=res;
      console.log(this.generos);
      }
  })
}


eliminarPelicula(id:any){
  this.peliculasservice.deleteMovies(id).subscribe({
    next:(res)=>{
      console.log(res);
      console.log("Pelicula eliminada");
    }
  })
}

searchCustomer(event:any){ 
  const text = event.target.value;
  this.searchedMovies = this.peliculas;
  if(text && text.trim() != ''){
    this.searchedMovies = this.searchedMovies.filter((movies: any) =>{
      return (movies.original_title.toLowerCase().indexOf(text.toLowerCase()) > -1); 

})
    }

}


async presentToast() {
  const toast = await this.toastController.create({
    message: 'elimida de favoritos',
    duration: 1500,
    icon: 'trash'
  });

  await toast.present();
}


}

