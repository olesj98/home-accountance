import { BaseApi } from '../core/base-api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEvent } from '../models/event.model';

@Injectable()
export class EventService extends BaseApi{
    constructor(public http: HttpClient){
        super(http);
    }

    addEvent(event:AppEvent):Observable<AppEvent>{
        return this.post('events', event);
    }

    getEvents(): Observable<any>{
        return this.get('events');
    }

    getEvent(id: string): Observable<AppEvent>{
        return this.get(`events/${id}`);
    }

}