import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "./services/product.service";
import {CreateEditProductComponent} from "./create-edit-product/create-edit-product.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDeleteModalComponent} from "../../shared/confirm-delete-modal/confirm-delete-modal.component";
import {SuccessModalComponent} from "../../shared/success-modal/success-modal.component";
import {debounceFilter} from "../../utils/utils";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
    { key: 'stock', label: 'Stock' },
  ];

  isSearching: boolean = false;
  data = [];
  totalProducts = 0;
  pageSize = 10;
  currentPage = 0;

  searchTerm: string = '';
  private performSearchDebounced = debounceFilter((query: string) => this.performSearch(query), 300);

  constructor(private productService: ProductService,
              private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    const skip = this.currentPage * this.pageSize;
    const limit = this.pageSize;

    this.productService.getProducts(skip, limit).subscribe(response => {
      this.data = response.products;
      this.totalProducts = response.total;
    });
  }

  openCreateEditProductForm(productData: any = null) {
    const dialogRef = this.dialog.open(CreateEditProductComponent, {
      width: '600px',
      data: { productData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
        this.listProducts();
      }
    });
  }

  onEditProduct(productData: any) {
    this.openCreateEditProductForm(productData);
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.listProducts();
  }

  onSearch() {
    this.isSearching = true;
    this.performSearchDebounced(this.searchTerm);
  }

  performSearch(query: string) {
    if (query) {
      this.productService.searchProducts(query).subscribe(response => {
        this.data = response.products;
        this.totalProducts = response.total;
        this.isSearching = false;
      });
    } else {
      this.listProducts();
      this.isSearching = false;
    }
  }

  onDeleteProduct(product: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      data: { message: 'Are you sure you want to delete this product?' },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.listProducts();
            this.dialogSuccess('Product has been deleted successfully!');

          },
          error: (err) => console.error('Failed to delete product:', err)
        });
      }
    });
  }

  dialogSuccess(message: string) {
    const dialogRef: MatDialogRef<SuccessModalComponent> = this.dialog.open(SuccessModalComponent, {
      data: { message: message },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
