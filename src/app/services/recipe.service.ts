import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Recipe} from '../models/recipe';
import {environment} from '../../environments/environment';
import {Register} from '../models/register';
import {Login} from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesURL = 'https://foodbaseapi.herokuapp.com/database';
  private username = 'Mark';

  private httpOptionsJSON = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.recipesURL
    })
  };

  constructor(private http: HttpClient) {
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL + '/public', this.httpOptionsJSON)
      .pipe(
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  getRecipesByUsername(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL + '/get/' + this.username, this.httpOptionsJSON)
      .pipe(
        catchError(this.handleError<Recipe[]>('getRecipesByUsername', []))
      );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesURL + '/add', recipe, this.httpOptionsJSON).pipe(
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(this.recipesURL + '/update', recipe, this.httpOptionsJSON).pipe(
      catchError(this.handleError<Recipe>('updateRecipe'))
    );
  }

  register(register: Register): Observable<Register> {
    return this.http.post<Register>(this.recipesURL + '/registration', register, this.httpOptionsJSON).pipe(
      catchError(this.handleError<Register>('register'))
    );
  }

  login(login: Login): Observable<any> {
    return this.http.post(this.recipesURL + '/login', login, {responseType: 'text'}).pipe(
      catchError(this.handleError<any>('login'))
    );
  }

  deleteRecipe(recipeID: string): Observable<Recipe> {
    return this.http.delete<Recipe>(this.recipesURL + '/delete/' + recipeID, this.httpOptionsJSON).pipe(
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
