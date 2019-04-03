import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { EventService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private categoryService: CategoriesService
  ) { }

  event: AppEvent;
  category: Category;
  isLoaded: boolean = false;

  sub1: Subscription;

  ngOnInit() {
    this.sub1 = this.route.params
      .pipe(
        mergeMap((params) => {
          return this.eventService.getEvent(params.id);
        })
      )
      .subscribe((event) => {
        this.event = event;
        this.categoryService.getCategory(''+event.category)
          .subscribe((category)=>{
            this.category = category;
            this.isLoaded = true;
          });
      });
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }
}
