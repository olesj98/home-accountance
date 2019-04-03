import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }

  categories: Category[];
  isLoaded = false;

  sub1:Subscription;

  ngOnInit() {
    this.sub1 = this.categoriesService.getCategories()
      .subscribe((categories: Category[])=>{
        this.categories = categories;
        this.isLoaded = true;
      })
  }

  ngOnDestroy(): void {
    if(this.sub1) this.sub1.unsubscribe();
  }

  newCategoryAdd(category: Category){
    this.categories.push(category);
  }

  newCategoryEdit(category: Category){
    const idx = this.categories.findIndex((c)=>{
      return c.id === category.id;
    });
    this.categories[idx] = category;
  }

}
