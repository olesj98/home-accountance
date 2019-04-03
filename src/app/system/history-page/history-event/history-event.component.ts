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
    this.intervalCheckIfLoaded = window.setInterval(this.addCatName.bind(this), 200);
  }

  addCatName(){
    if (this.isLoaded){
      this.events.forEach((e) => {
        e.catName = this.categories.find((c) => c.id === e.category).name;
      });
      window.clearInterval(this.intervalCheckIfLoaded);
    }
  }

  changeCriteria(field: string){
    this.searchPlaceholder = field;
    this.searchField = field.toLowerCase();
  }

}
