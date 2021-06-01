import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-fab',
  templateUrl: './search-fab.component.html',
  styleUrls: ['./search-fab.component.scss']
})
export class SearchFabComponent implements OnInit {

  @Input()
  searching!: boolean;
  icon = 'search';

  constructor() {
  }

  ngOnInit(): void {
  }

  checkIfSearching(): void {
    if (this.searching) {
      this.icon = 'search';
    }
    else{
      this.icon = 'close';
    }
  }
}
