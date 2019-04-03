import { Component, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import * as moment from 'moment';

import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventService
  ) { }

  isLoaded = false;
  chartData = [];
  categories: Category[];
  events: AppEvent[];

  filteredEvents: AppEvent[];

  sub1: Subscription;

  isFilterVisible: boolean = false;

  calcChartData(){
    this.chartData = [];

    this.categories.forEach((cat)=>{
      const catEvents = this.filteredEvents.filter((e)=>e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, val) => total += val.amount, 0)
      });
    });
  }

  ngOnInit() {
    this.sub1 = combineLatest( this.categoriesService.getCategories(), this.eventsService.getEvents())
      .subscribe((data)=>{
        this.categories = data[0];
        this.events = data[1];

        this.setOriginalEvents();
        this.calcChartData();
        this.isLoaded = true;
      });

  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  private setOriginalEvents(){
    this.filteredEvents = this.events.slice();
  }

  private toggleFilterVisibility(dir: boolean){
    this.isFilterVisible = dir;
  }

  openFilter(){
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e)=>{
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e)=>{
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e)=>{
        const momentDate = moment(e.date, 'DD.MM.YYYY hh:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    console.log(this.filteredEvents);
    this.calcChartData();
  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calcChartData();
  }

}
