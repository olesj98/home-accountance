import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { AppEvent } from '../../shared/models/event.model';

import * as moment from 'moment';
import { mergeMap } from 'rxjs/operators';
import { EventService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
    {type:"income", label: "Income"},
    {type:"outcome", label: "Outcome"}
  ];

  constructor(
    private eventService: EventService,
    private billService: BillService
    ) { }

  message = {};
  sub1: Subscription;
  sub2: Subscription;

  ngOnInit() {
    this.message = {type: 'danger', text: ''};
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
  }

  private showMessage(text){
    this.message = {type: 'danger', text};
    window.setTimeout(()=>{
      this.message = {type: 'danger', text: ''};
    }, 3000);
  }

  onSubmit(form: NgForm){
    let {amount, description, category, type} = form.value;
    if(amount<0) amount *=(-1);

    const event = new AppEvent(
      type, +amount, +category,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      description);
    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill)=>{
        let value = 0;
        if(type === 'outcome'){
          if(amount > bill.value){
            this.showMessage(`Not enough money! You need ${amount-bill.value} more`);
            return;
          }
          value = bill.value - amount;
        } else{
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({value, currency: bill.currency})
          .pipe(
            mergeMap(()=>this.eventService.addEvent(event))
          )
          .subscribe(()=>{
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'outcome'
            });
          });

      });

  }

}
