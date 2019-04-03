import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-categry',
  templateUrl: './add-categry.component.html',
  styleUrls: ['./add-categry.component.css']
})
export class AddCategryComponent{

  constructor(private categoriesService: CategoriesService) { }

  @Output() onCategoryAdd = new EventEmitter<Category>();

  sub1: Subscription;

  ngOnDestroy(): void {
    if(this.sub1) this.sub1.unsubscribe();
  }

  onSubmit(form: NgForm){
    let { name, value} = form.value;
    if(value < 0) value = value*(-1);

    const category = {'name': name, 'capacity': value};

    this.categoriesService.addCategory(category)
      .subscribe((category:Category)=>{
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
      });
  }
}
