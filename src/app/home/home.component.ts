import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomersType } from '../models/northwind/customers-type';
import { RevenueType } from '../models/e-commerce/revenue-type';
import { MeetingsTasksType } from '../models/crmapp/meetings-tasks-type';
import { ECommerceService } from '../services/ecommerce.service';
import { CRMAppService } from '../services/crmapp.service';
import { NorthwindService } from '../services/northwind.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public eCommerceRevenue: RevenueType[] = [];
  public northwindCustomers: CustomersType[] = [];
  public cRMAppMeetingsTasks: MeetingsTasksType[] = [];

  constructor(
    private eCommerceService: ECommerceService,
    private northwindService: NorthwindService,
    private cRMAppService: CRMAppService,
  ) {}

  ngOnInit() {
    this.eCommerceService.getRevenueList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.eCommerceRevenue = data,
      error: (_err: any) => this.eCommerceRevenue = []
    });
    this.northwindService.getData('CustomersType').pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindCustomers = data,
      error: (_err: any) => this.northwindCustomers = []
    });
    this.cRMAppService.getMeetingsTasksList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.cRMAppMeetingsTasks = data,
      error: (_err: any) => this.cRMAppMeetingsTasks = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
