import {AbstractControlOptions} from '@angular/forms';

export interface FormButtonConfig {
  label: string;
  class: string;
  show: boolean;
  disabled?: boolean;
}

export interface InputConfig {
  name: string;
  type: string;
  label: string;
  validators?: string[];
  required?: boolean;
  value?: string | number | boolean;
  options?: {value: string | number, label: string}[];
  minLength?: number;
  maxLength?: number;
  forceReadOnly?: boolean;
}

export interface FormColumnConfig {
  columns: InputConfig[];
}

export interface FormJSON {
  rows: FormColumnConfig[];
  options?: AbstractControlOptions;
}
