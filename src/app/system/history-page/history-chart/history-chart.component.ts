import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent {
  @Input() data;

  addedColors = [];
  colors = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
  deletedColors = [];

  ngOnInit() {
    this.generateHexColor();
  }

  generateHexColor(){
    this.colors = this.colors.concat(this.deletedColors);
    if(this.data.length > this.colors.length){
      let diffLength = this.data.length - this.colors.length;
      if(diffLength > 0){
        while(diffLength > 0){
          let letters = "0123456789ABCDEF";

          let color = '#';

          for (let i = 0; i < 6; i++){
            color += letters[(Math.floor(Math.random() * 16))];
          }
          this.addedColors.push(color);
          diffLength--;
        }
      }
      else if(diffLength < 0){
        while(diffLength < 0){
          this.deletedColors.push(this.colors.pop());
          diffLength++;
        }
      }
      else{
        return;
      }
      this.colors = this.colors.concat(this.addedColors);
    }
  }
}
