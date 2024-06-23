import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, concatMap, map, timer } from 'rxjs';
import { UserInfoApp } from '../user-info';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input type="text" [(ngModel)]="query"  (ngModelChange)="onSearchUpdated($event)">
    <div *ngFor="let user of users$ | async">
        {{ user.email }}
    </div>
  `
})
export class UsersComponent {

  userService: UserService = inject(UserService);
  query = '';
  querySubject$ = new BehaviorSubject<string>('');

  users$!: Observable<UserInfoApp[]>;

  ngOnInit() {
    this.users$ =
      combineLatest([
        this.querySubject$,
        this.userService.data
      ]
      ).pipe(
        //  concatMap(([querySubject$, data]) =>
        //  timer(60000).pipe(
        map(([querySubject$, data]) =>
          data.filter(x => x.email.includes(querySubject$))
        )
      )
    //  )

    // );
  }

  public onSearchUpdated($eventValue: string) {
    this.querySubject$.next($eventValue);
  }
}
