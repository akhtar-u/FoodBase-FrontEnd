import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Recipe} from '../models/recipe';
import {environment} from '../../environments/environment';
import {Register} from '../models/register';
import {Login} from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesURL = environment.API_URL;
  private username = 'Mark';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL + '/public')
      .pipe(
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  getRecipesByUsername(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL + '/get/' + this.username)
      .pipe(
        catchError(this.handleError<Recipe[]>('getRecipesByUsername', []))
      );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesURL + '/add', recipe, this.httpOptions).pipe(
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  register(register: Register): Observable<Register> {
    return this.http.post<Register>(this.recipesURL + '/register', register, this.httpOptions).pipe(
      catchError(this.handleError<Register>('register'))
    );
  }

  login(login: Login): Observable<Login> {
    return this.http.post<Login>(this.recipesURL + '/login', login, this.httpOptions).pipe(
      catchError(this.handleError<Login>('login'))
    );
  }

  deleteRecipe(recipeID: string): Observable<Recipe> {
    return this.http.delete<Recipe>(this.recipesURL + '/delete/' + recipeID, this.httpOptions).pipe(
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }


}
