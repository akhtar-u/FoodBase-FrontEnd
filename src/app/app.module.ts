import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

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
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  showFiller = false;
}
