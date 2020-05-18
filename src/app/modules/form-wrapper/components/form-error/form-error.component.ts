import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

const ERROR_PREFIX = 'FORM_ERROR_';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html'
})
export class FormErrorComponent implements OnChanges, OnInit {

  @Input() errors;
  @Input() minLength;
  @Input() maxLength;

  errorMessage: string;

  constructor(private translateService: TranslateService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = this.translateErrorMessage(Object.keys(this.errors)[0].toUpperCase());
  }

  ngOnInit(): void {
    this.errorMessage = this.translateErrorMessage(Object.keys(this.errors)[0].toUpperCase());
  }

  private translateErrorMessage(errorKey: string) {
    if (errorKey === 'MINLENGTH' && this.minLength) {
      return this.translateService.instant(ERROR_PREFIX + errorKey, {minLength: this.minLength});
    } else if (errorKey === 'MAXLENGTH' && this.maxLength) {
      return this.translateService.instant(ERROR_PREFIX + errorKey, {maxLength: this.maxLength});
    } else {
      return this.translateService.instant(ERROR_PREFIX + errorKey);
    }
  }

}
