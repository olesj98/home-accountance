import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  rub: number;
  usd: number;

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;
    this.rub = rates['RUB'] * this.bill.value;
    this.usd = rates['USD'] * this.bill.value;
  }

}
