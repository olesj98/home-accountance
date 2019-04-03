import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../core/base-api';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService extends BaseApi{
    constructor(public http: HttpClient){
        super(http);
    }

    addCategory(category: Category){
        return this.post('categories', category);
    }

    getCategories(){
        return this.get('categories');
    }

    getCategory(id: string){
        return this.get(`categories/${id}`);
    }

    updateCategory(category: Category){
        return this.put(`categories/${category.id}`, category);
    }
}