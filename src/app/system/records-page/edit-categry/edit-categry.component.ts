import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';


@Component({
  selector: 'app-edit-categry',
  templateUrl: './edit-categry.component.html',
  styleUrls: ['./edit-categry.component.css']
})
export class EditCategryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
    this.onCategoryChange();
    this.message = {'type':'danger', 'text':''};
  }

  onCategoryChange(){
    this.currentCategory = this.categories
      .find((category)=>{
        return category.id === +this.currentCategoryId;
      });
  }

  onSubmit(form:NgForm){
    let {name, value} = form.value;
    if(value<0) value *= (-1);

    const category = {'name': name, 'capacity': value, 'id':+this.currentCategoryId};

    this.categoryService.updateCategory(category)
      .subscribe((category:Category)=>{
        this.onCategoryEdit.emit(category);
        this.message.text = 'Category has been edited';
        this.message.type = 'success';
        window.setTimeout(()=>this.message.text = '', 3000);
      })
  }
}
