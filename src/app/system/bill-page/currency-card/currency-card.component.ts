import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;
  date: Date = new Date();

  currencies = ['USD', 'RUB'];
  
  constructor() { }

  ngOnInit() {
    
  }

}
