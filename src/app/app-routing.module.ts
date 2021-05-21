import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: '', component: CardsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'addrecipe', component: AddRecipeComponent},
  { path: 'editrecipe', component: EditRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
