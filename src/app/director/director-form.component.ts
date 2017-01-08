import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GenreService } from "../genre/genre.service";
import { DirectorService } from "./director.service";
import { Director }    from './director';

@Component({
  selector: 'director-form',
  templateUrl: './director-form.component.html',
  providers: [DirectorService]
})
export class DirectorFormComponent implements OnInit {
    formGroupDirector : FormGroup;
    director: Director = null;

    constructor(public formBuilderDirector: FormBuilder,
                    private directorService: DirectorService,
                    private router : Router,
                    private route: ActivatedRoute){
    }

    ngOnInit(): void {
        this.route.params
        .switchMap((params: Params) =>
        this.directorService.getDirector(+params['id']))
        .subscribe(director => {
            this.director = director;
            this.buildForm();
        });

        this.buildForm();
    };

    private buildForm(): void{
        this.formGroupDirector = this.formBuilderDirector.group({
            first_name: [!this.director? '' : this.director.first_name, Validators.required],
            last_name: [!this.director? '' : this.director.last_name, Validators.required],
        })
    }

    public onSubmit(valid: boolean): void {

         if(valid == true && !this.director){
             this.addDirector();
         }
         else if (valid == true){
             this.editDirector();
         }
    }

    private addDirector(): void {
        console.log(this.formGroupDirector.value);
        this.directorService
            .create(this.formGroupDirector.value)
            .then((res) => {
                console.log(res);
                this.router.navigateByUrl('/director');
            });
    }

    private editDirector(): void {
        let director: Director = this.formGroupDirector.value;
        console.log(director);
        director.id = this.director.id;
        this.directorService
           .update(director)
           .then((res) => {
               console.log(res);
               this.router.navigateByUrl('/director');
           });
    }
}
