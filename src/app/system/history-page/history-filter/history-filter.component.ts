import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  timePeriods = [
    {type: 'd', label: 'Day'},
    {type: 'w', label: 'Week'},
    {type: 'M', label: 'Mounth'}
  ];

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  selectedTypes = [];
  selectedCategories = [];
  selectedPeriod = 'd';

  private calculateInputParams(field: Object[], checked: boolean, value: string){
    if(checked){
      field.indexOf(value) === -1 ? field.push(value) : null;
    }
    else 
      field = field.filter((i)=> i !== value);
  }

  changeCategory({checked, value}){
    this.calculateInputParams(this.selectedCategories, checked, value);
  }

  handleChangeType({value, checked}){
    this.calculateInputParams(this.selectedTypes, checked, value);
  }

  applyFilter() {
    const data = {
      categories: this.selectedCategories,
      types: this.selectedTypes,
      period: this.selectedPeriod
    };
    this.onFilterApply.emit(data);
  }

  closeFilter(){
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.onFilterCancel.emit();
  }

}
