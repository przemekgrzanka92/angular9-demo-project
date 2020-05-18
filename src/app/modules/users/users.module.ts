import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UsersNewComponent} from './components/users-new/users-new.component';
import {UsersDetailsComponent} from './components/users-details/users-details.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormWrapperModule} from '../form-wrapper/form-wrapper.module';

const routes: Routes = [
  {path: '', component: UsersListComponent},
  {path: 'new', component: UsersNewComponent},
  {path: ':id', component: UsersDetailsComponent},
];

@NgModule({
  declarations: [
    UsersListComponent,
    UsersNewComponent,
    UsersDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormWrapperModule
  ]
})
export class UsersModule {
}
