import {Pipe, PipeTransform} from '@angular/core';
import {Recipe} from '../models/recipe';

@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {

  transform(recipes: Recipe[], searchText: string): Recipe[] {
    return recipes.filter(r => r.recipeName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
  }

}
