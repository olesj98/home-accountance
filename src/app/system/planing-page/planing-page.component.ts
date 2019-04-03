import { Component, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Observable, Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.css']
})
export class PlaningPageComponent implements OnInit {

  isLoaded = false;
  bill: Bill;
  categories: Category[];
  events: AppEvent[];

  sub1: Subscription;


  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data)=>{
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    })
  }

  ngOnDestroy(): void {
    if(this.sub1)
      this.sub1.unsubscribe();
  }

  getCategoryCost(category: Category){
    const categoryEvents = this.events.filter((event)=>{
      return event.category === category.id && event.type === 'outcome';
    });
    return categoryEvents.reduce((total, event) => total += event.amount, 0);
  }

  private getPercent(cat: Category): number{
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string{
    return this.getPercent(cat) + '%';
  }

  getCatColor(cat: Category): string{
    const percent = this.getPercent(cat);
    return  percent < 50 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

}
