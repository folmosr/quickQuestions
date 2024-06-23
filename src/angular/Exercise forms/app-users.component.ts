import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-users.component.html',
  styleUrl: './app-users.component.css'
})
export class AppUsersComponent {
  applyForm!: FormGroup;
  /**
   *
   */
  @Output()
  event = new EventEmitter<{ email: string; name: string; birthday: Date; address: { zip: number; city: string; }; }>;

  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.applyForm = this.formBuilder.group({
      name: ['', [
        Validators.required,

      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      birthdate: [this.getFormattedDate(), [
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
      ]],
      address: this.formBuilder.group({
        zip: ['', [
          Validators.required,
          Validators.minLength(4)
        ]],
        city: ['', [
          Validators.required
        ]],
      })
    });
  }

  get name() {
    return this.applyForm.get('name');
  }

  get email() {
    return this.applyForm.get('email');
  }

  get birthdate() {
    return this.applyForm.get('birthdate');
  }

  get zip() {
    return this.applyForm.get('address')?.get('zip');
  }

  get city() {
    return this.applyForm.get('address')?.get('city');
  }

  private getFormattedDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    let rawmm = today.getMonth() - 5; // Months start at 0!
    let rawdd = today.getDate();

    let dd: string, mm: string;

    if (rawdd < 10) dd = '0' + rawdd; else dd = `${rawdd}`;
    if (rawmm < 10) {
      mm = (rawmm == 0) ? '01' : `0${rawmm}`
    } else {
      mm = `${rawmm}`
    };

    const formattedToday = yyyy + '-' + mm + '-' + dd;
    return formattedToday;
  }
}

submitApplication() {
  const formDetail: any = {
    name: this.applyForm.value.name,
    email: this.applyForm.value.email,
    birthdate: this.applyForm.value.birthdate,
    address: {
      zip: this.applyForm.value.address.zip,
      city: this.applyForm.value.address.city,
    }
  };
  this.event.emit(formDetail);
}
}
