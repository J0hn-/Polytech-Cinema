import { Component } from '@angular/core';
import { Actor }    from './actor';

@Component({
  moduleId: module.id,
  selector: 'hero-form',
  templateUrl: 'actor-form.component.html'
})
export class ActorFormComponent {
  submitted = false;
  onSubmit() { this.submitted = true; }
  get diagnostic() { return JSON.stringify(this.model); }
}
