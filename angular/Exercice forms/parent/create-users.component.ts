import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppUsersComponent } from '../app-users/app-users.component';

@Component({
  selector: 'create-users',
  standalone: true,
  imports: [CommonModule, AppUsersComponent],
  templateUrl: './create-users.component.html'
})
export class CreateUsersComponent {


  /**
   *
   */
  constructor() {

  }

  public onSubmit($event: any) {
    console.log($event);
  }
}
