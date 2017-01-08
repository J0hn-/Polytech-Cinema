import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GenreService } from "./genre.service";
import { Genre }    from './genre';

@Component({
  selector: 'genre-form',
  templateUrl: './genre-form.component.html',
  providers: [GenreService]
})
export class GenreFormComponent implements OnInit {
    formGroupGenre : FormGroup;
    genre: Genre = null;

    constructor(public formBuilderGenre: FormBuilder,
                    private genreService: GenreService,
                    private router : Router,
                    private route: ActivatedRoute){
    }

    ngOnInit(): void {
        this.route.params
        .switchMap((params: Params) =>
        this.genreService.getGenre(+params['id']))
        .subscribe(genre => {
            this.genre = genre;
            this.buildForm();
        });

        this.buildForm();
    };

    private buildForm(): void{
        this.formGroupGenre = this.formBuilderGenre.group({
            title: [!this.genre? '' : this.genre.title, Validators.required],
        })
    }

    public onSubmit(valid: boolean): void {

         if(valid == true && !this.genre){
             this.addGenre();
         }
         else if (valid == true){
             this.editGenre();
         }
    }

    private addGenre(): void {
        console.log(this.formGroupGenre.value);
        this.genreService
            .create(this.formGroupGenre.value)
            .then(
                (genre: Genre) => this.genre = genre
            );
    }

    private editGenre(): void {
        let genre: Genre = this.formGroupGenre.value;
        console.log(genre);
        genre.id = this.genre.id;
        this.genreService
           .update(genre)
           .then((res) => {
               console.log(res);
               this.router.navigateByUrl('/genre');
           });
    }
}
