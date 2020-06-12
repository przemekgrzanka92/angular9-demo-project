import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InitialComponent} from './components/initial/initial.component';

const routes: Routes = [
  {path: '', component: InitialComponent},
  {
    path: 'users',
    loadChildren: () => import(`./modules/users/users.module`).then(m => m.UsersModule),
  },
  {
    path: 'to-do-app',
    loadChildren: () => import(`./modules/to-do-app/to-do-app.module`).then(m => m.ToToModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
