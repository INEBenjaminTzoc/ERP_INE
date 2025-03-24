import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Customer, CustomerService, Representative } from '../../service/customer.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../../../services/security.service';

const modules = [
  TableModule,
  IconFieldModule,
  InputIcon,
  ButtonModule,
  InputTextModule,
  MultiSelectModule,
  FormsModule,
  SliderModule,
  ProgressBarModule,
  CommonModule
]

@Component({
  selector: 'app-users',
  imports: modules,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [CustomerService]
})
export class UsersComponent implements OnInit {
  customers1: Customer[] = [];
  loading: boolean = true;
  representatives: Representative[] = [];
  activityValues: number[] = [0, 100];
  @ViewChild('filter') filter!: ElementRef;

  constructor (
    private securityService: SecurityService,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.securityService.getProducts().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.customerService.getCustomersLarge().then((customers) => {
      this.customers1 = customers;
      this.loading = false;

      // @ts-ignore
      this.customers1.forEach((customer) => (customer.date = new Date(customer.date)));

      this.representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];
    });
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
