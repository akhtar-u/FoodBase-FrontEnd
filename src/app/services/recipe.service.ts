import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Recipe} from '../models/recipe';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesURL = 'http://localhost:8080/database';
  private username = 'Mark';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL + '/public')
      .pipe(
        tap(_ => this.log('fetched recipes')),
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  getRecipesByUsername(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL + '/get/' + this.username)
      .pipe(
        tap(_ => this.log('fetched recipes for user')),
        catchError(this.handleError<Recipe[]>('getRecipesByUsername', []))
      );
  }


  deleteRecipe(recipeID: string): Observable<Recipe> {
    return this.http.delete<Recipe>(this.recipesURL + '/delete/' + recipeID, this.httpOptions).pipe(
      tap(_ => this.log('deleted recipe with id: ' + recipeID)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    console.log(`RecipeService: ${message}`);
  }

}
