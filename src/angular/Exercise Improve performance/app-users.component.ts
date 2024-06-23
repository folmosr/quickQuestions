import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GetCapitalizeFirstWordPipe } from '../get-capitalize-first-word.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AppUsers, GetCapitalizeFirstWordPipe],
  template: `
    <div *ngFor="let user of users">
        {{ user.name | getCapitalizeFirstWord }}
    </div>
  `
})
export class AppUsers {

  @Input()
  users: { name: string; }[] = [];

  constructor() { }

}
