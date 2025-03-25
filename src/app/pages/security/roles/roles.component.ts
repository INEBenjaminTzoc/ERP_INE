import { Component, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Product, ProductService } from '../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const modules = [
  ToolbarModule,
  ButtonModule,
  // TableModule,
  CommonModule,
  // RatingModule,
  // TagModule,
  TextareaModule,
  InputTextModule,
  FormsModule,
  SelectModule,
  DialogModule,
  RadioButtonModule,
  InputNumberModule,
  ConfirmDialogModule
];

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-roles',
  imports: modules,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  providers: [MessageService, ConfirmationService, ProductService]
})
export class RolesComponent {
  //VARIABLES PARA EL DIALOGO - AGREGAR ROL
  showDialogRole: boolean = false;

  product!: Product;
  submitted: boolean = false;

  products = signal<Product[]>([]);
  selectedProducts!: Product[] | null;
  cols!: Column[];
  statuses!: any[];
  exportColumns!: ExportColumn[];

  @ViewChild('rolesTable') rolesTable!: Table;

  constructor (
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.loadDemoData();
  }

  loadDemoData() {
    this.productService.getProducts().then((data) => {
        this.products.set(data);
    });

    this.statuses = [
        { label: 'INSTOCK', value: 'instock' },
        { label: 'LOWSTOCK', value: 'lowstock' },
        { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];

    this.cols = [
        { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
        { field: 'name', header: 'Name' },
        { field: 'image', header: 'Image' },
        { field: 'price', header: 'Price' },
        { field: 'category', header: 'Category' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }
  
  openNew() {
    this.product = {};
    this.showDialogRole = true;
    this.submitted = false;
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

  hideDialog() {

  }

  saveProduct() {

  }
}
