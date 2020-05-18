import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormWrapperComponent} from './components/form-wrapper/form-wrapper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormErrorComponent} from './components/form-error/form-error.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    FormWrapperComponent,
    FormErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule
  ],
  exports: [
    FormWrapperComponent
  ]
})
export class FormWrapperModule {
}
