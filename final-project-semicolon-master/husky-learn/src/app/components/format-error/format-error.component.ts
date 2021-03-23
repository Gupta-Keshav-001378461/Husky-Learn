import { Component, OnInit, Input } from '@angular/core';

// Declaring component for error list
@Component({
  selector: 'app-format-error',
  templateUrl: './format-error.component.html',
  styleUrls: ['./format-error.component.scss']
})
export class FormatErrorComponent implements OnInit {
  @Input() errorList;
  formattedErrors: Array<string> = [];
  constructor() { }

  // format and display error from errorlist
  ngOnInit(): void {
    this.formattedErrors = [];
    if (this.errorList.errors) {
      for (let field in this.errorList.errors) {
        this.formattedErrors.push(`${field} ${this.errorList.errors[field]}`);
      }
    }
  }
}
