import { Component, OnInit, Input } from '@angular/core';
import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.css']
})
export class HistoryEventComponent implements OnInit {

  @Input() isLoaded: boolean;
  @Input() events: AppEvent[] = [];
  @Input() categories: Category[];

  searchValue = '';
  searchPlaceholder = 'amount';
  searchField = 'amount';
  intervalCheckIfLoaded;

  constructor() { }

  ngOnInit() {
  }

  changeCriteria(field: string){
    this.searchPlaceholder = field;
    this.searchField = field.toLowerCase();
  }

}
