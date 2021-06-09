import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Recipe} from '../models/recipe';
import {Register} from '../models/register';
import {Login} from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesURL = 'https://foodbaseapi.herokuapp.com/database';

  constructor(private http: HttpClient) {
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL + '/public')
      .pipe(
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  getRecipesByUsername(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL + '/get/' + localStorage.getItem('username'));
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesURL + '/add', recipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(this.recipesURL + '/update', recipe);
  }

  register(register: Register): Observable<Register> {
    return this.http.post<Register>(this.recipesURL + '/registration', register);
  }

  login(login: Login): Observable<any> {
    return this.http.post(this.recipesURL + '/login', login, {responseType: 'text'});
  }

  deleteRecipe(recipeID: string): Observable<Recipe> {
    return this.http.delete<Recipe>(this.recipesURL + '/delete/' + recipeID);
  }


  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
