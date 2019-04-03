import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlaningPageComponent } from './planing-page/planing-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from './shared/services/bill.service';
import { MomentPipe } from '../shared/pipes/moment.pipe';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { EditCategryComponent } from './records-page/edit-categry/edit-categry.component';
import { AddCategryComponent } from './records-page/add-categry/add-categry.component';
import { CategoriesService } from './shared/services/categories.service';
import { EventService } from './shared/services/events.service';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventComponent } from './history-page/history-event/history-event.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SystemRoutingModule,
        NgxChartsModule
    ],
    declarations: [
        SystemComponent,
        BillPageComponent,
        HistoryPageComponent,
        PlaningPageComponent,
        RecordsPageComponent,
        SidebarComponent,
        HeaderComponent,
        DropdownDirective,
        BillCardComponent,
        CurrencyCardComponent,
        MomentPipe,
        AddEventComponent,
        EditCategryComponent,
        AddCategryComponent,
        HistoryChartComponent,
        HistoryEventComponent,
        HistoryDetailComponent,
        HistoryFilterComponent,
        FilterPipe
    ],
    providers: [
        BillService,
        CategoriesService,
        EventService
    ]
})
export class SystemModule{}