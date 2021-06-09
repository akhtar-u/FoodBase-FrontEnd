import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Recipe} from '../models/recipe';
import {Register} from '../models/register';
import {Login} from '../models/login';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesURL = environment.API_URL;

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

  deleteRecipe(recipeID: string): Observable<Recipe> {
    return this.http.delete<Recipe>(this.recipesURL + '/delete/' + recipeID);
  }

  register(register: Register): Observable<Register> {
    return this.http.post<Register>(this.recipesURL + '/registration', register);
  }

  login(login: Login): Observable<any> {
    return this.http.post(this.recipesURL + '/login', login, {responseType: 'text'});
  }

  async isAuthorized(): Promise<boolean> {
    try {
      const response = await this.http.get(this.recipesURL + '/authorization').toPromise();
      return true;
    } catch (error) {
      console.log('service false');
      return false;
    }
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
