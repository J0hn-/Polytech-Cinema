import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FilmService } from "./film.service";
import { Film }    from './film';
import { GenreService } from "../genre/genre.service";
import { Genre }    from '../genre/genre';
import { DirectorService } from "../director/director.service";
import { Director }    from '../director/director';

@Component({
  selector: 'film-form',
  templateUrl: './film-form.component.html',
  providers: [FilmService, GenreService, DirectorService]
})
export class FilmFormComponent implements OnInit {
    formGroupFilm : FormGroup;
    film: Film = null;
    directors: Director[] ;
    genres: Genre[] ;

    constructor(public formBuilderFilm: FormBuilder,
                    private filmService: FilmService,
                    private genreService: GenreService,
                    private directorService: DirectorService,
                    private router : Router,
                    private route: ActivatedRoute){
    }

    ngOnInit(): void {
        this.route.params
        .switchMap((params: Params) =>
        this.filmService.getFilm(+params['id']))
        .subscribe(film => {
            this.film = film;
            this.buildForm();
        });

        this.directorService
           .getDirectors()
           .subscribe((data: Director[]) => this.directors = data,
           error => console.log(error),
           () => console.log(this.directors));

       this.genreService
           .getGenres()
           .subscribe((data: Genre[]) => this.genres = data,
            error => console.log(error),
            () => console.log(this.directors));

        this.buildForm();
    };

    private buildForm(): void{
        this.formGroupFilm = this.formBuilderFilm.group({
            title: [!this.film? '' : this.film.title, Validators.required],
            duration: [!this.film? '' : this.film.duration, Validators.required],
            release_date: [!this.film? '' : this.film.release_date],
            director: [!this.film ? '' : this.film.director ? this.film.director.id : ''],
            genre: [!this.film ? '' : this.film.genre ? this.film.genre.id : ''],
        })
    }

    public onSubmit(valid: boolean): void {
        for (let director of this.directors) {
            if(director.id == this.formGroupFilm.value.director){
                this.formGroupFilm.value.director = director;
            }
        }

        for (let genre of this.genres) {
            if(genre.id == this.formGroupFilm.value.genre){
                this.formGroupFilm.value.genre = genre;
            }
        }
         if(valid == true && !this.film){
             this.addFilm();
         }
         else if (valid == true){
             this.editFilm();
         }
    }

    private addFilm(): void {
        console.log(this.formGroupFilm.value);
        this.filmService
            .create(this.formGroupFilm.value)
            .then((res) => {
                console.log(res);
                this.router.navigateByUrl('/dashboard');
            });
    }

    private editFilm(): void {
        let film: Film = this.formGroupFilm.value;
        console.log(film);
        film.id = this.film.id;
        this.filmService
           .update(film)
           .then((res) => {
               console.log(res);
               this.router.navigateByUrl('/dashboard');
           });
    }
}
