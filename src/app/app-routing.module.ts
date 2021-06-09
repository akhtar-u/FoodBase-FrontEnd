import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardsComponent} from './cards/cards.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: CardsComponent},
  {path: 'login', component: LoginComponent},
  {canActivate: [AuthGuard], path: 'dashboard', component: DashboardComponent},
  {canActivate: [AuthGuard], path: 'addrecipe', component: AddRecipeComponent},
  {canActivate: [AuthGuard], path: 'editrecipe', component: EditRecipeComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
