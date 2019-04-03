import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../core/base-api';
import { Bill } from '../models/bill.model';

@Injectable()
export class BillService extends BaseApi{

    constructor(public http: HttpClient){
        super(http);
    }

    getBill(){
        return this.get('bill');
    }

    getCurrency(){
        return this.http.get('http://data.fixer.io/api/latest?access_key=d35cb3f6011da302b7f73d4f9ed06538');
    }

    updateBill(bill: Bill){
        return this.put('bill', bill);
    }

    test = "test";
}