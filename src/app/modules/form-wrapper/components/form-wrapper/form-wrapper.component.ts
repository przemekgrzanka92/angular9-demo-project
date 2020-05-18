import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PasswordValidator} from '../../validators/password.validator';
import {FormButtonConfig, FormColumnConfig, FormJSON, InputConfig} from '../../models/form.data';

const VALIDATORS = {
  required: Validators.required,
  email: Validators.email,
  password: PasswordValidator
};

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html'
})
export class FormWrapperComponent implements OnChanges, OnInit, OnDestroy {

  @Input() saveButtonConfig: FormButtonConfig = {label: 'Save', class: 'btn-success', show: true};
  @Input() cancelButtonConfig: FormButtonConfig = {label: 'Cancel', class: 'btn-secondary', show: true};
  @Input() editButtonConfig: FormButtonConfig = {label: 'Edit', class: 'btn-primary', show: true};
  @Input() removeButtonConfig: FormButtonConfig = {label: 'Remove', class: 'btn-danger', show: false};
  @Input() showFormButtons = true;

  @Input() formReadOnly = false;
  @Input() initialFormValue;
  @Input() formJsonConfig: FormJSON;

  @Output() formChange = new EventEmitter<any>();
  @Output() formAction = new EventEmitter<string>();
  @Output() formStatus = new EventEmitter<boolean>();
  @Output() formTouched = new EventEmitter<boolean>();

  form: FormGroup;
  formChangesSub: Subscription;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.initialFormValue && this.form) {
      this.updateFormValue(this.initialFormValue);
    }
  }

  ngOnInit(): void {
    this.createForm(this.formJsonConfig);
  }

  ngOnDestroy(): void {
    if (this.formChangesSub) {
      this.formChangesSub.unsubscribe();
    }
  }

  emitFormAction(formAction: string) {
    this.formAction.emit(formAction);
  }

  private onFormChanges() {
    this.formChangesSub = this.form.valueChanges.subscribe(val => {
      this.formChange.emit(this.form.value);
      this.formStatus.emit(this.form.valid);
      this.formTouched.emit(this.form.touched);
    });
  }

  private updateFormValue(formValue: {}) {
    if (formValue) {
      for (const [key, value] of Object.entries(formValue)) {
        if (this.form.get(key)) {
          this.form.get(key).patchValue(value);
        }
      }
    }
  }

  private createForm(formJson: FormJSON) {
    const formControlNames = this.getFormControls(formJson.rows);
    const formGroup = {};

    formControlNames.forEach(control => {
      formGroup[control.name] = this.createFormControl(control);
    });

    this.form = this.formBuilder.group(formGroup, formJson.options ? formJson.options : {});

    if (this.initialFormValue && Object.keys(this.initialFormValue).length) {
      this.updateFormValue(this.initialFormValue);
    }

    this.onFormChanges();
  }

  private createFormControl(inputConfig: InputConfig): any[] {
    const validators = [];

    if (inputConfig.validators) {
      inputConfig.validators.forEach(validator => {
        validators.push(VALIDATORS[validator]);
      });
    }

    if (inputConfig.minLength) {
      validators.push(Validators.minLength(inputConfig.minLength));
    }

    if (inputConfig.maxLength) {
      validators.push(Validators.maxLength(inputConfig.maxLength));
    }

    return [inputConfig.value ? inputConfig.value : null, validators];
  }

  private getFormControls(formJsonRows: FormColumnConfig[]): InputConfig[] {
    const formControls: InputConfig[] = [];

    formJsonRows.forEach(row => {
      row.columns.forEach(column => {
        formControls.push(column);
      });
    });

    return formControls;
  }
}
