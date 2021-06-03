import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Recipe} from '../models/recipe';
import {environment} from '../../environments/environment';


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
