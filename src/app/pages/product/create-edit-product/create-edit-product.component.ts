import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {SuccessModalComponent} from "../../../shared/success-modal/success-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    NgIf
  ],
  templateUrl: './create-edit-product.component.html',
  styleUrl: './create-edit-product.component.scss'
})
export class CreateEditProductComponent implements OnInit{
  productForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<CreateEditProductComponent>,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.productData;
    this.productForm = this.fb.group({
      title: [this.data?.productData?.title || '', Validators.required],
      price: [this.data?.productData?.price || null, [Validators.required, Validators.min(0)]],
      category: [this.data?.productData?.category || '', Validators.required]
    });
  }

  onSave() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (this.isEditMode) {
        this.productService.updateProduct(this.data.productData.id, productData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogSuccess();
          },
          error: (error) => {
            console.error('Error updating product:', error);
          }
        });
      } else {
        // Create mode
        this.productService.createProduct(productData).subscribe({
          next: (response) => {
            console.log('Product created:', response);
            this.dialogRef.close();
            this.dialogSuccess();
          },
          error: (error) => {
            console.error('Error creating product:', error);
          }
        });
      }
    }
  }
  onCancel() {
    this.dialogRef.close();
  }

  dialogSuccess() {
    const dialogRef: MatDialogRef<SuccessModalComponent> = this.dialog.open(SuccessModalComponent, {
      data: { message: 'Product has been saved successfully!' },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.productForm.reset();
      this.router.navigate(['/product']);
    });
  }
}
