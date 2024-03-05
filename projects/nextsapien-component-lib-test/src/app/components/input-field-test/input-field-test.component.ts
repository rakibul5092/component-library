import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field-test',
  templateUrl: './input-field-test.component.html',
  styleUrls: ['./input-field-test.component.scss'],
})
export class InputFieldTestComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup<any> {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }
}
