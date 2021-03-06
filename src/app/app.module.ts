import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {GridlistDirective} from './directives/gridlist.directive';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {CardsComponent} from './cards/cards.component';
import {SearchFabComponent} from './search-fab/search-fab.component';
import {LoginComponent} from './login/login.component';
import {ViewRecipeComponent} from './view-recipe/view-recipe.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {DbRecipeRowComponent} from './db-recipe-row/db-recipe-row.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SearchPipe} from './pipes/search.pipe';
import {HTTPInterceptor} from './interceptors/httpinterceptor';

@NgModule({
  declarations: [
    AppComponent,
    GridlistDirective,
    FooterComponent,
    HeaderComponent,
    CardsComponent,
    SearchFabComponent,
    LoginComponent,
    ViewRecipeComponent,
    DashboardComponent,
    AddRecipeComponent,
    DbRecipeRowComponent,
    EditRecipeComponent,
    SearchPipe
  ],
  entryComponents: [ViewRecipeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  showFiller = false;
}
