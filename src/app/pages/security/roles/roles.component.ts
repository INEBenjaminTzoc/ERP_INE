import { Component, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Product } from '../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';

const modules = [
  ToolbarModule,
  ButtonModule,
  TableModule
];

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-roles',
  imports: modules,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class RolesComponent {
  product!: Product;
  submitted: boolean = false;
  productDialog: boolean = false;

  products = signal<Product[]>([]);
  selectedProducts!: Product[] | null;
  cols!: Column[];

  @ViewChild('rolesTable') rolesTable!: Table;

  constructor (
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}
  
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products.set(this.products().filter((val) => !this.selectedProducts?.includes(val)));
            this.selectedProducts = null;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Products Deleted',
                life: 3000
            });
        }
    });
  }

  exportCSV() {
    this.rolesTable.exportCSV();
  }
}
